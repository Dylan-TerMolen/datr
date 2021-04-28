import googlemaps
import base64
from random import randrange, choice
from .env import GOOGLE_CLOUD_API_KEY

places_api_types = [
    "amusement_park",
    "aquarium",
    "art_gallery",
    "bakery",
    "bar",
    "bowling_alley",
    "cafe",
    "meal_takeaway",
    "movie_rental",
    "movie_theater",
    "museum",
    "night_club",
    "park",
    "restaurant",
    "shopping_mall",
    "spa",
    "store",
    "tourist_attraction",
    "zoo"
]

mood_mappings_to_type = {
    "Outdoorsy":["aquarium", "park", "zoo"],
    "Adventurous":["amusement_park", "aquarium", "zoo"],
    "Creative":["art_gallery", "cafe", "movie_theater", "museum",],
    "Musical":["night_club"],
    "Hungry":["bakery", ],
    "Sporty":["bowling_alley", ]
}

gmaps = googlemaps.Client(key=GOOGLE_CLOUD_API_KEY)

# Perform algorithm to generate a date idea for a user
def generate_ideas(preferences: [str], moods: [str]) -> [dict]:
    places = []
    type_choice_from_mood = choice(mood_mappings_to_type[choice(moods)])
    activity_choice = get_place("", type_choice_from_mood)
    places.append(activity_choice)

    if preferences[0] == "Drinks only":
        places.append(get_place("", place_type="bar"))
    else:
        places.append(get_place(choice(preferences), place_type="restaurant"))
        places.append(get_place("", place_type="bar"))

    return places

# Get a place from the google places API given a query string and a place type
# Then parse the response to get a dict to return to client
def get_place(query: str, place_type:str=None) -> dict:
    response = gmaps.places(query=query, type=place_type)
    results = response["results"]
    chosen_place = results[randrange(len(results))]
    photo_string = get_places_photo(chosen_place)
        
    placeDict = parse_api_place(chosen_place)
    if photo_string is not None:
        placeDict["photo_string"] = photo_string
    
    return placeDict


# Make a request to get a place's picture given the photo reference returned by the Google Places API 
def get_places_photo(place:dict) -> str:
    try:
        photo_reference = place["photos"][0]["photo_reference"]
    except KeyError as e:
        return None
    
    photo_generator = gmaps.places_photo(photo_reference, max_width=300, max_height=300)
    photo_bytes = bytearray()
    for b in photo_generator:
        photo_bytes += bytearray(b)
    
    photo_string = base64.b64encode(photo_bytes).decode("utf-8")
    return photo_string
    

# Parse API Reponse into Serializable Python Dictionary with Needed Attributes
def parse_api_place(place: dict) -> dict:
    try:
        photo_reference = place["photos"][0]["photo_reference"]
    except KeyError as e:
        photo_reference = None

    return {
        "address": place["formatted_address"],
        "name": place["name"],
        "place_id": place["place_id"],
        "photo_reference": photo_reference,
        "rating": place["rating"],
        "total_ratings": place["user_ratings_total"]
    }
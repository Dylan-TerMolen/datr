# Parse API Reponse into Serializable Python Dictionary with Needed Attributes
def parse_api_place(place):
    try:
        photo_reference = place["photos"][0]["photo_reference"]
    except KeyError as e:
        photo_reference = None

    return {
        "address": place["formatted_address"],
        "name": place["name"],
        "place_id": place["place_id"],
        "photo_reference": photo_reference
    }
"""Unit tests for the package."""

from steamship import Steamship
from steamship.data.tags.tag_constants import TagValue

from src.api import MyPackage


def test_joke():
    """You can test your app like a regular Python object."""
    client = Steamship()
    app = MyPackage(client=client)
    result = app.generate("Relationships")
    joke = result.get(TagValue.STRING_VALUE)
    assert joke is not None
    print(joke)

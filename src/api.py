"""Description of your app."""
from typing import Type

from steamship import File, MimeTypes
from steamship.invocable import Config, Invocable, create_handler, post


class MyPackageConfig(Config):
    """Config object containing required parameters to initialize a MyPackage instance."""
    pass


class MyPackage(Invocable):
    """Example steamship Package."""

    config: MyPackageConfig

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.llm = self.client.use_plugin("prompt-generation-default", "limit-100", config={
            "max_words": 100
        })

    def config_cls(self) -> Type[Config]:
        """Return the Configuration class."""
        return MyPackageConfig

    @post("generate")
    def generate(self, topic: str = None) -> dict:
        """Return a one line joke about a topic."""

        # Sanitize the topic
        if topic is not None: # Strip out whitespace
            topic = topic.strip()
        if topic is None or len(topic) == 0 or len(topic) > 50: # Make sure it isn't empty or too long
            topic = "Life"
        topic = topic.split("\n")[0] # Make sure it isn't multi-line

        prompt = f"""The following is a list of the funniest one line jokes ever created.
        
TOPIC: Work
JOKE: Most people are shocked when they find out how bad I am as an electrician.

TOPIC: Science
JOKE: Never trust atoms; they make up everything.

TOPIC: Driving
JOKE: My son had his driver's test today. He got 8 out of 10. The other 2 guys jumped clear.

TOPIC: Health
JOKE: I have an inferiority complex but it's not a very good one.

TOPIC: Animals
JOKE: At what age is it appropriate to tell my dog that he's adopted?

TOPIC: Love
JOKE: Never laugh at your wife's choices: your one of them.

TOPIC: Food
JOKE: Why do the French eat snails? They don't like fast food.

TOPIC: {topic}
JOKE:"""

        task = self.llm.tag(doc=prompt)
        task.wait()
        file = task.output

        # Currently we fetch generation output from a tag nested deep in the output of a file
        # There are some great technical reasons for this at scale, but we know it's not great UI for simple prompt hacking.
        # We're working on it :-)
        return task.output.file.blocks[0].tags[0].value


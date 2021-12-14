import psycopg2
from configparser import ConfigParser as cfg

class Config:
    config = cfg()
    config.read("./config.ini", encoding="utf8")
    port = config.get("server","port")
    host = config.get("hosting","address")

    def __init__(self, port=port, host=host):
        self.port = port
        self.host = host

if __name__ == "__main__":
    Conf = Config()
    # print(Conf)
    None
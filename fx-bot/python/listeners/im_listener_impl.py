import logging
import requests
from sym_api_client_python.clients.sym_bot_client import SymBotClient
from sym_api_client_python.listeners.im_listener import IMListener
from sym_api_client_python.processors.sym_message_parser import SymMessageParser


def get_fx_rate(currency):
    url = f'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency={currency}&apikey=C7G0Q2QOJ80OECGM'
    api_response = requests.get(url)
    exchange_rate = api_response.json()['Realtime Currency Exchange Rate']['5. Exchange Rate']
    return exchange_rate

class IMListenerImpl(IMListener):
    def __init__(self, sym_bot_client):
        self.bot_client = sym_bot_client
        self.message_parser = SymMessageParser()
        self.watchlist = []

    async def on_im_message(self, im_message):
        logging.debug('IM Message Received')

        msg_text = self.message_parser.get_text(im_message)
        first_name = self.message_parser.get_im_first_name(im_message)
        stream_id = self.message_parser.get_stream_id(im_message)

        command = msg_text[0]

        if command == '/watch':
            if len(msg_text) != 2:
                response = 'Usage: /watch [currency]'
            else:
                currency = msg_text[1]
                self.watchlist.append(currency)
                response = f'Watching {currency}'
        elif command == '/list':
            items = ''.join(f'<li>{c} @ {get_fx_rate(c)}</li>' for c in self.watchlist)
            response = f'Watchlist:<ul>{items}</ul>'

        message = f'<messageML> {response}</messageML>'
        self.bot_client.get_message_client().send_msg(stream_id, dict(message=message))

    async def on_im_created(self, im_created):
        logging.debug('IM created', im_created)

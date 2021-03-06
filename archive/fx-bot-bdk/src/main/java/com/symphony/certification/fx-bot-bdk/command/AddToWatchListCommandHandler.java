package com.symphony.certification.fx-bot-bdk.command;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import com.symphony.bdk.bot.sdk.command.CommandHandler;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

public class AddToWatchListCommandHandler extends CommandHandler {

  private static final String QUOTE_URL = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD" +
          "&to_currency=%s&apikey=C7G0Q2QOJ80OECGM";

  private static final String ADD_QUOTE_COMMAND = "/addToWatchlist";

  private JsonMapper jsonMapper;
  private RestClient restClient;
  //Todo:
  private DataService dataService;

  //constructor:
  public AddToWatchListCommandHandler(RestClient restClient, DataService dataService) {
    this.restClient = restClient;
    this.jsonMapper = jsonMapper;
    this.dataService = dataService;
  }

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " " + ADD_QUOTE_COMMAND)
        .asPredicate();
  }
  
  /**
   * Invoked when command matches
   */
  @Override
  public void handle(BotCommand command, SymphonyMessage response) {
    Map<String, String> variables = new HashMap<>();
    variables.put("user", command.getUser().getDisplayName());

    response.setTemplateMessage("Auto generated command addtowatchlist, Hello, <b>{{user}}</b>", variables);
  }
}

package com.symphony.certification.fx-bot-bdk.spreadsheet.model;

import java.util.Map;

import lombok.Data;

/**
 * Model that relates spreadsheet with the room it belongs to
 *
 * @author Gabriel Berberian
 */
@Data
public class RoomSpreadsheet {

  private String streamId;
  private Map spreadsheet;
}

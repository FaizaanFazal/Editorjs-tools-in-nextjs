import './styles/table-constructor.css';
import { create } from './documentUtils';
import { Table } from './table';

const CSS = {
  editor: 'tc-editor',
  toolBarHor: 'tc-toolbar--hor',
  toolBarVer: 'tc-toolbar--ver',
  inputField: 'tc-table__inp',
};

export interface TableData {
  content?: string[][];
  config?:TableConfig;
  borders: boolean ;
  tableHeader:boolean;
  textAlignment:string;
}

export interface TableConfig {
  rows?: number | string;
  cols?: number | string;
}

/**
 * Entry point. Controls table and provides API to the user.
 */
export class TableConstructor {
  private _table: Table;
  private _container: HTMLElement;

  /**
   * Creates the TableConstructor instance.
   * @param {TableData} data - Previously saved data for insertion into the table.
   * @param {TableConfig} config - Configuration of the table.
   * @param {object} api - Editor.js API.
   */
  constructor(data: TableData, config: TableConfig, api: { styles?: { block: string  } }) {
    // Creating table
    this._table = new Table();
    const size = this._resizeTable(data, config);

    this._fillTable(data, size);

    // Creating container around table
    this._container = create('div', [CSS.editor, api.styles?.block ?  api.styles?.block:""], undefined, [
      this._table.htmlElement,
    ]);
  }

  /**
   * Returns the HTML element of TableConstructor.
   * @return {HTMLElement}
   */
  get htmlElement(): HTMLElement {
    return this._container;
  }

  /**
   * Returns the instance of Table.
   * @return {Table}
   */
  get table(): Table {
    return this._table;
  }

  /**
   * @private
   *
   * Fills the table with data passed to the constructor.
   * @param {TableData} data - Data to insert into the table.
   * @param {{rows: number, cols: number}} size - Contains number of rows and columns.
   */
  private _fillTable(data: TableData, size: { rows: number; cols: number }): void {
    if (data.content) {
      for (let i = 0; i < size.rows && i < data.content.length; i++) {
        for (let j = 0; j < size.cols && j < data.content[i].length; j++) {
          // Get current cell and its editable part
          const input = this._table.body.rows[i].cells[j].querySelector(`.${CSS.inputField}`) as HTMLElement;
          if (input) {
            input.innerHTML = data.content[i][j];
          }
        }
      }
    }
  }

  /**
   * @private
   *
   * Resizes the table to match the configuration or provided data.
   * @param {TableData} data - Data for inserting into the table.
   * @param {TableConfig} config - Configuration of the table.
   * @return {{rows: number, cols: number}} - Number of rows and columns.
   */
  private _resizeTable(data: TableData, config: TableConfig): { rows: number; cols: number } {
    const isValidArray = Array.isArray(data.content);
    const isNotEmptyArray = isValidArray ? data?.content?.length : false;
    const contentRows = isValidArray ? data?.content?.length : undefined;
    const contentCols = isNotEmptyArray && data && data.content && data.content.length > 0
  ? data.content[0]?.length ?? 0  : 0;
    

    const parsedRows = Number.parseInt(config.rows as string, 10);
    const parsedCols = Number.parseInt(config.cols as string, 10);

    // Value of config has to be a positive number
    const configRows = !isNaN(parsedRows) && parsedRows > 0 ? parsedRows : undefined;
    const configCols = !isNaN(parsedCols) && parsedCols > 0 ? parsedCols : undefined;

    const defaultRows = 1;
    const defaultCols = 1;
    const rows = contentRows || configRows || defaultRows;
    const cols = contentCols || configCols || defaultCols;

    for (let i = 0; i < rows; i++) {
      this._table.insertRow();
    }
    for (let i = 0; i < cols; i++) {
      this._table.insertColumn();
    }

    return { rows, cols };
  }
}

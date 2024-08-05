import { create } from './documentUtils';
import './styles/table.css';

const CSS = {
  table: 'tc-table',
  inputField: 'tc-table__inp',
  cell: 'tc-table__cell',
  wrapper: 'tc-table__wrap',
  area: 'tc-table__area',
  highlight: 'tc-table__highlight',
};

/**
 * Generates and manages table contents.
 */
export class Table {
  private _numberOfColumns: number;
  private _numberOfRows: number;
  private _element: HTMLElement;
  private _table: HTMLTableElement;
  private _selectedCell: HTMLTableCellElement | null;

  constructor() {
    this._numberOfColumns = 0;
    this._numberOfRows = 0;
    this._element = this._createTableWrapper();
    this._table = this._element.querySelector('table') as HTMLTableElement;
    this._selectedCell = null;
    this._attachEvents();
  }

  /**
   * Returns selected/editable cell or null if no row is selected.
   * @return {HTMLTableCellElement | null}
   */
  get selectedCell(): HTMLTableCellElement | null {
    return this._selectedCell;
  }

  /**
   * Sets a selected cell and highlights it.
   * @param cell - New current cell.
   */
  set selectedCell(cell: HTMLTableCellElement | null) {
    if (this._selectedCell) {
      this._selectedCell.classList.remove(CSS.highlight);
    }

    this._selectedCell = cell;

    if (this._selectedCell) {
      this._selectedCell.classList.add(CSS.highlight);
    }
  }

  /**
   * Returns the current row that contains the current cell,
   * or null if no cell is selected.
   * @returns {HTMLTableRowElement | null}
   */
  get selectedRow(): HTMLTableRowElement | null {
    if (!this.selectedCell) return null;

    return this.selectedCell.closest('tr') as HTMLTableRowElement;
  }

  /**
   * Inserts a column to the right of the currently selected cell.
   */
  insertColumnAfter(): void {
    this.insertColumn(1);
    this.focusCellOnSelectedCell();
  }

  /**
   * Inserts a column to the left of the currently selected cell.
   */
  insertColumnBefore(): void {
    this.insertColumn();
    this.focusCellOnSelectedCell();
  }

  /**
   * Inserts a new row below the current row.
   */
  insertRowBefore(): void {
    this.insertRow();
    this.focusCellOnSelectedCell();
  }

  /**
   * Inserts a row above the current row.
   */
  insertRowAfter(): void {
    this.insertRow(1);
    this.focusCellOnSelectedCell();
  }

  /**
   * Inserts a column into the table relative to the current cell.
   * @param {number} direction - Direction of insertion. 0 is insertion before, 1 is insertion after.
   */
  insertColumn(direction = 0): void {
    direction = Math.min(Math.max(direction, 0), 1);

    const insertionIndex = this.selectedCell
      ? this.selectedCell.cellIndex + direction
      : 0;

    this._numberOfColumns++;
    // Add cell in each row
    const rows = this._table.rows;

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].insertCell(insertionIndex);

      this._fillCell(cell);
    }
  }

  /**
   * Removes the column that includes the currently selected cell.
   * Does nothing if there's no current cell.
   */
  deleteColumn(): void {
    if (!this.selectedCell) return;

    const removalIndex = this.selectedCell.cellIndex;

    this._numberOfColumns--;
    // Delete cell in each row
    const rows = this._table.rows;

    for (let i = 0; i < rows.length; i++) {
      rows[i].deleteCell(removalIndex);
    }
  }

  toggleBorders(): void {
  const hasBorders = this._table.classList.contains('tc-all-border');
  // Toggle borders class on the table
  if (hasBorders) {
    this._table.classList.remove('tc-all-border');
  } else {
    this._table.classList.add('tc-all-border');
  }
  }

  toggleHeader(): void {
  const hasBorders = this._table.classList.contains('tc-Header');
  // Toggle borders class on the table
  if (hasBorders) {
    this._table.classList.remove('tc-Header');
  } else {
    this._table.classList.add('tc-Header');
  }
  }

  /**
   * Inserts a row into the table relative to the current cell.
   * @param {number} direction - Direction of insertion. 0 is insertion before, 1 is insertion after.
   * @return {HTMLTableRowElement} row
   */
  insertRow(direction = 0): HTMLTableRowElement {
    direction = Math.min(Math.max(direction, 0), 1);

    const insertionIndex = this.selectedRow
      ? this.selectedRow.rowIndex + direction
      : 0;

    const row = this._table.insertRow(insertionIndex);

    this._numberOfRows++;

    this._fillRow(row);
    return row;
  }

  /**
   * Removes a row in the table at the specified index.
   * @param {number} index - Index in the array of rows where the row will be removed; -1 if remove at the end.
   */
  deleteRow(index = -1): void {
    if (!this.selectedRow) return;

    const removalIndex = this.selectedRow.rowIndex;

    this._table.deleteRow(removalIndex);
    this._numberOfRows--;
  }

  /**
   * Gets the HTML table wrapper.
   * @return {HTMLElement}
   */
  get htmlElement(): HTMLElement {
    return this._element;
  }

  /**
   * Gets the real table tag.
   * @return {HTMLTableElement}
   */
  get body(): HTMLTableElement {
    return this._table;
  }

  /**
   * @private
   *
   * Creates the table structure.
   * @return {HTMLElement} - Table wrapper.
   */
  private _createTableWrapper(): HTMLElement {
    return create('div', [ CSS.wrapper ], undefined, [
      create('table', [ CSS.table ]),
    ]);
  }

  /**
   * @private
   *
   * Creates the editable area of a cell.
   * @return {HTMLElement} - The area.
   */
  private _createContenteditableArea(): HTMLElement {
    return create('div', [ CSS.inputField ], { contenteditable: 'true' });
  }

  /**
   * @private
   *
   * Fills an empty cell in the editable area.
   * @param {HTMLTableCellElement} cell - Empty cell.
   */
  private _fillCell(cell: HTMLTableCellElement): void {
    cell.classList.add(CSS.cell);
    const content = this._createContenteditableArea();
    cell.appendChild(create('div', [ CSS.area ], undefined, [ content ]));
  }

  /**
   * @private
   *
   * Fills an empty row with cells, based on the number of columns.
   * @param row - The empty row.
   */
  private _fillRow(row: HTMLTableRowElement): void {
    for (let i = 0; i < this._numberOfColumns; i++) {
      const cell = row.insertCell();
      this._fillCell(cell);
    }
  }

  /**
   * @private
   *
   * Attaches necessary events.
   */
  private _attachEvents(): void {
    this._table.addEventListener('focus', (event: FocusEvent) => {
      this._focusEditField(event);
    }, true);

    this._table.addEventListener('keydown', (event: KeyboardEvent) => {
      this._pressedEnterInEditField(event);
    });

    this._table.addEventListener('click', (event: MouseEvent) => {
      this._clickedOnCell(event);
    });

    this.htmlElement.addEventListener('keydown', (event: KeyboardEvent) => {
      this._containerKeydown(event);
    });
  }

  /**
   * @private
   *
   * When focusing on an editable field, remembers the cell.
   * @param {FocusEvent} event
   */
  private _focusEditField(event: FocusEvent): void {
    this.selectedCell = (event.target as HTMLElement).tagName === 'TD'
      ? (event.target as HTMLTableCellElement)
      : (event.target as HTMLElement).closest('td') as HTMLTableCellElement;
  }

  /**
   * Focuses the cell on the currently selected cell.
   */
  focusCellOnSelectedCell(): void {
    const cell = this.selectedCell;
    if (cell) {
      const firstChild = cell.childNodes[0] as HTMLElement | undefined;
      const innerChild = firstChild?.childNodes[0] as HTMLElement | undefined;
      innerChild?.focus();
    }
  }
 

  /**
   * @private
   *
   * When Enter is pressed while editing a field.
   * @param {KeyboardEvent} event
   */
  private _pressedEnterInEditField(event: KeyboardEvent): void {
    if (!event.target || !((event.target as HTMLElement).classList.contains(CSS.inputField))) {
      return;
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
    }
  }

  /**
   * @private
   *
   * When clicking on a cell.
   * @param {MouseEvent} event
   */
  private _clickedOnCell(event: MouseEvent): void {
    if (!(event.target as HTMLElement).classList.contains(CSS.cell)) {
      return;
    }
    const content = (event.target as HTMLElement).querySelector('.' + CSS.inputField) as HTMLElement;
    content.focus();
  }

  /**
   * @private
   *
   * Detects button presses when editing the table's content.
   * @param {KeyboardEvent} event
   */
  private _containerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.ctrlKey) {
      this._containerEnterPressed(event);
    }
  }

  /**
   * @private
   *
   * If "Ctrl + Enter" is pressed, then create a new row below the current one and focus it.
   * @param {KeyboardEvent} event
   */
  private _containerEnterPressed(event: KeyboardEvent): void {
    const newRow = this.insertRow(1);
    newRow.cells[0].click();
  }
}

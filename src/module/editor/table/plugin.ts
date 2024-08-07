import { TableConstructor as ImportedTableConstructor, TableConfig, TableData } from "./tableConstructor";

import toolboxIcon from "./img/toolboxIcon.svg";
import insertColBefore from "./img/insertColBeforeIcon.svg";
import insertColAfter from "./img/insertColAfterIcon.svg";
import insertRowBefore from "./img/insertRowBeforeIcon.svg";
import insertRowAfter from "./img/insertRowAfter.svg";
import deleteRow from "./img/deleteRowIcon.svg";
import deleteCol from "./img/deleteColIcon.svg";


const Icons = {
  Toolbox: toolboxIcon,
  InsertColBefore: insertColBefore,
  InsertColAfter: insertColAfter,
  InsertRowBefore: insertRowBefore,
  InsertRowAfter: insertRowAfter,
  DeleteRow: deleteRow,
  DeleteCol: deleteCol,
};

const CSS = {
  input: "tc-table__inp",
};



interface TableConstructor {
  table: {
    insertColumnBefore: () => void;
    insertColumnAfter: () => void;
    insertRowBefore: () => void;
    insertRowAfter: () => void;
    deleteRow: () => void;
    deleteColumn: () => void;
    toggleHeader: () => void;
    toggleBorders: () => void;
    textALign: (actionName: string) => void;
    selectedCell: any;
    focusCellOnSelectedCell: () => void;
  };
  htmlElement: HTMLDivElement;
}

interface Api {
  styles?: { block: string };
  i18n: {
    t: (key: string) => string;
  };
  tooltip: {
    onHover: (element: HTMLElement, title: string, options: any) => void;
  };
}

export class Table {
  static get enableLineBreaks(): boolean {
    return true;
  }

  static get toolbox(): { icon: string; title: string } {
    console.log("toolboxIcon", Icons.Toolbox.src);
    return {
      icon: `<svg width="18" height="14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"></path></svg>`,
      title: "Table",
    };
  }

  private api: Api;
  private wrapper: HTMLDivElement | undefined;
  private config: TableConfig;
  private data: TableData;
  private _tableConstructor: TableConstructor;
  private actions: { actionName: string; icon: string; label: string }[];

  constructor({ data, config, api }: { data: TableData; config: TableConfig; api: Api }) {
    this.api = api;
    this.wrapper = undefined;
    this.config = config;
    this.data = data;
    this._tableConstructor = new ImportedTableConstructor(data, config, api) as unknown as TableConstructor;


    this.actions = [
      {
        actionName: "InsertColBefore",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-21 0 512 512" width="18" height="18"><path d="M181.332031 106.667969c-3.925781 0-7.828125-1.429688-10.921875-4.3125l-80-74.664063c-4.820312-4.480468-6.378906-11.457031-3.96875-17.558594C88.851562 4.011719 94.761719 0 101.332031 0h160c6.570313 0 12.480469 4.011719 14.871094 10.132812 2.410156 6.125.851563 13.078126-3.96875 17.558594l-80 74.664063c-3.070313 2.882812-6.976563 4.3125-10.902344 4.3125zM141.910156 32l39.421875 36.777344L220.757812 32zm0 0M90.667969 512H37.332031C16.746094 512 0 495.253906 0 474.667969V144c0-20.585938 16.746094-37.332031 37.332031-37.332031h53.335938C111.253906 106.667969 128 123.414062 128 144v330.667969C128 495.253906 111.253906 512 90.667969 512zM37.332031 138.667969C34.390625 138.667969 32 141.054688 32 144v330.667969C32 477.609375 34.390625 480 37.332031 480h53.335938C93.609375 480 96 477.609375 96 474.667969V144c0-2.945312-2.390625-5.332031-5.332031-5.332031zm0 0M432 512H272c-20.585938 0-37.332031-16.746094-37.332031-37.332031V144c0-20.585938 16.746093-37.332031 37.332031-37.332031h160c20.585938 0 37.332031 16.746093 37.332031 37.332031v330.667969C469.332031 495.253906 452.585938 512 432 512zM272 138.667969c-2.945312 0-5.332031 2.386719-5.332031 5.332031v330.667969C266.667969 477.609375 269.054688 480 272 480h160c2.945312 0 5.332031-2.390625 5.332031-5.332031V144c0-2.945312-2.386719-5.332031-5.332031-5.332031zm0 0"/><path d="M112 325.332031H16c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0M453.332031 325.332031H250.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.664062c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="M352 512c-8.832031 0-16-7.167969-16-16V122.667969c0-8.832031 7.167969-16 16-16s16 7.167969 16 16V496c0 8.832031-7.167969 16-16 16zm0 0"/></svg>`,
        label: this.api.i18n.t("Insert column before"),
      },
      {
        actionName: "InsertColAfter",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-21 0 512 512" width="18" height="18"><path d="M288 106.667969c-3.925781 0-7.851562-1.429688-10.921875-4.3125l-80-74.664063c-4.800781-4.480468-6.378906-11.457031-3.96875-17.558594C195.519531 4.03125 201.429688 0 208 0h160c6.570312 0 12.480469 4.011719 14.890625 10.132812 2.410156 6.125.832031 13.078126-3.96875 17.558594l-80 74.664063c-3.070313 2.882812-6.996094 4.3125-10.921875 4.3125zM248.597656 32L288 68.777344 327.402344 32zm0 0M432 512h-53.332031c-20.589844 0-37.335938-16.746094-37.335938-37.332031V144c0-20.585938 16.746094-37.332031 37.335938-37.332031H432c20.585938 0 37.332031 16.746093 37.332031 37.332031v330.667969C469.332031 495.253906 452.585938 512 432 512zm-53.332031-373.332031c-2.945313 0-5.335938 2.386719-5.335938 5.332031v330.667969c0 2.941406 2.390625 5.332031 5.335938 5.332031H432c2.945312 0 5.332031-2.390625 5.332031-5.332031V144c0-2.945312-2.386719-5.332031-5.332031-5.332031zm0 0M197.332031 512h-160C16.746094 512 0 495.253906 0 474.667969V144c0-20.585938 16.746094-37.332031 37.332031-37.332031h160c20.589844 0 37.335938 16.746093 37.335938 37.332031v330.667969c0 20.585937-16.746094 37.332031-37.335938 37.332031zm-160-373.332031C34.390625 138.667969 32 141.054688 32 144v330.667969C32 477.609375 34.390625 480 37.332031 480h160c2.945313 0 5.335938-2.390625 5.335938-5.332031V144c0-2.945312-2.390625-5.332031-5.335938-5.332031zm0 0"/><path d="M453.332031 325.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0M218.667969 325.332031H16c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="M117.332031 512c-8.832031 0-16-7.167969-16-16V122.667969c0-8.832031 7.167969-16 16-16s16 7.167969 16 16V496c0 8.832031-7.167969 16-16 16zm0 0"/></svg>`,
        label: this.api.i18n.t("Insert column after"),
      },
      {
        actionName: "InsertRowBefore",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -21 512 512" width="18" height="18"><path d="M16 277.332031c-1.984375 0-3.96875-.363281-5.867188-1.109375C4.011719 273.8125 0 267.902344 0 261.332031v-160c0-6.570312 4.011719-12.480469 10.132812-14.890625 6.144532-2.410156 13.078126-.851562 17.558594 3.96875l74.664063 80c5.761719 6.144532 5.761719 15.679688 0 21.824219l-74.664063 80C24.597656 275.5625 20.351562 277.332031 16 277.332031zm16-135.402343v78.804687l36.777344-39.402344zm0 0M474.667969 128H144c-20.585938 0-37.332031-16.746094-37.332031-37.332031V37.332031C106.667969 16.746094 123.414062 0 144 0h330.667969C495.253906 0 512 16.746094 512 37.332031v53.335938C512 111.253906 495.253906 128 474.667969 128zM144 32c-2.945312 0-5.332031 2.390625-5.332031 5.332031v53.335938C138.667969 93.609375 141.054688 96 144 96h330.667969C477.609375 96 480 93.609375 480 90.667969V37.332031C480 34.390625 477.609375 32 474.667969 32zm0 0M474.667969 469.332031H144c-20.585938 0-37.332031-16.746093-37.332031-37.332031V272c0-20.585938 16.746093-37.332031 37.332031-37.332031h330.667969C495.253906 234.667969 512 251.414062 512 272v160c0 20.585938-16.746094 37.332031-37.332031 37.332031zM144 266.667969c-2.945312 0-5.332031 2.386719-5.332031 5.332031v160c0 2.945312 2.386719 5.332031 5.332031 5.332031h330.667969C477.609375 437.332031 480 434.945312 480 432V272c0-2.945312-2.390625-5.332031-5.332031-5.332031zm0 0"/><path d="M309.332031 128c-8.832031 0-16-7.167969-16-16V16c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v96c0 8.832031-7.167969 16-16 16zm0 0M309.332031 469.332031c-8.832031 0-16-7.167969-16-16V250.667969c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v202.664062c0 8.832031-7.167969 16-16 16zm0 0"/><path d="M496 368H122.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16H496c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg>`,
        label: this.api.i18n.t("Insert row before"),
      },
      {
        actionName: "InsertRowAfter",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -21 512 512" width="18" height="18"><path d="M16 384c-1.984375 0-3.96875-.363281-5.867188-1.109375C4.011719 380.480469 0 374.570312 0 368V208c0-6.570312 4.011719-12.480469 10.132812-14.890625 6.144532-2.410156 13.078126-.851563 17.558594 3.96875l74.664063 80c5.761719 6.144531 5.761719 15.679687 0 21.824219l-74.664063 80C24.597656 382.230469 20.351562 384 16 384zm16-135.402344v78.804688L68.777344 288zm0 0M474.667969 469.332031H144c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-53.332031c0-20.589844 16.746093-37.335938 37.332031-37.335938h330.667969c20.585937 0 37.332031 16.746094 37.332031 37.335938V432c0 20.585938-16.746094 37.332031-37.332031 37.332031zm-330.667969-96c-2.945312 0-5.332031 2.390625-5.332031 5.335938V432c0 2.945312 2.386719 5.332031 5.332031 5.332031h330.667969C477.609375 437.332031 480 434.945312 480 432v-53.332031c0-2.945313-2.390625-5.335938-5.332031-5.335938zm0 0M474.667969 234.667969H144c-20.585938 0-37.332031-16.746094-37.332031-37.335938v-160C106.667969 16.746094 123.414062 0 144 0h330.667969C495.253906 0 512 16.746094 512 37.332031v160c0 20.589844-16.746094 37.335938-37.332031 37.335938zM144 32c-2.945312 0-5.332031 2.390625-5.332031 5.332031v160c0 2.945313 2.386719 5.335938 5.332031 5.335938h330.667969c2.941406 0 5.332031-2.390625 5.332031-5.335938v-160C480 34.390625 477.609375 32 474.667969 32zm0 0"/><path d="M309.332031 469.332031c-8.832031 0-16-7.167969-16-16v-96c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v96c0 8.832031-7.167969 16-16 16zm0 0M309.332031 234.667969c-8.832031 0-16-7.167969-16-16V16c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v202.667969c0 8.832031-7.167969 16-16 16zm0 0"/><path d="M496 133.332031H122.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16H496c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg>`,
        label: this.api.i18n.t("Insert row after"),
      },
      {
        actionName: "DeleteRow",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.381 15.381" width="18" height="18"><g><path d="M0 1.732v7.732h6.053c0-.035-.004-.07-.004-.104 0-.434.061-.854.165-1.255H1.36V3.092h12.662v2.192c.546.396 1.01.897 1.359 1.477V1.732H0z"/><path d="M11.196 5.28c-2.307 0-4.183 1.877-4.183 4.184 0 2.308 1.876 4.185 4.183 4.185 2.309 0 4.185-1.877 4.185-4.185 0-2.307-1.876-4.184-4.185-4.184zm0 7.233c-1.679 0-3.047-1.367-3.047-3.049 0-1.68 1.368-3.049 3.047-3.049 1.684 0 3.05 1.369 3.05 3.049 0 1.682-1.366 3.049-3.05 3.049z"/><path d="M9.312 8.759h3.844v1.104H9.312z"/></g></svg>`,
        label: this.api.i18n.t("Delete row"),
      },
      {
        actionName: "DeleteCol",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="18" height="18"><path d="M13.594 20.85V24h-10V2h10v3.15c.633-.323 1.304-.565 2-.727V1c0-.551-.448-1-1-1h-12c-.55 0-1 .449-1 1v24c0 .551.449 1 1 1h12c.552 0 1-.449 1-1v-3.424c-.696-.161-1.367-.403-2-.726z"/><path d="M17.594 6.188c-3.762 0-6.813 3.051-6.812 6.813-.001 3.761 3.05 6.812 6.812 6.812s6.813-3.051 6.813-6.813-3.052-6.812-6.813-6.812zm3.632 7.802l-7.267.001v-1.982h7.268l-.001 1.981z"/></svg>`,
        label: this.api.i18n.t("Delete column"),
      },
      {
        actionName: "TableHeader",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m14.4978951 12.4978973-.0105089-9.99999996c-.0011648-1.10374784-.8962548-1.99789734-2-1.99789734h-9.99999995c-1.0543629 0-1.91816623.81587779-1.99451537 1.85073766l-.00548463.151365.0105133 10.00000004c.0011604 1.1037478.89625045 1.9978973 1.99999889 1.9978973h9.99999776c1.0543618 0 1.9181652-.8158778 1.9945143-1.8507377z"/><path d="m4.5 4.5v9.817"/><path d="m7-2v14" transform="matrix(0 1 -1 0 12.5 -2.5)"/></g></svg>`,
        label: this.api.i18n.t("TableHeader"),
      },
      {
        actionName: "AllBorders",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 512 512"><path d="M56,472H456a16,16,0,0,0,16-16V56a16,16,0,0,0-16-16H56A16,16,0,0,0,40,56V456A16,16,0,0,0,56,472ZM272,72H440V240H272Zm0,200H440V440H272ZM72,72H240V240H72Zm0,200H240V440H72Z" class="ci-primary"/></svg>`,
        label: this.api.i18n.t("All Borders"),
      },
      {
        actionName: "Left",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" width="18px" height="18px" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: this.api.i18n.t("Left"),
      },
      {
        actionName: "Center",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" width="18px" height="18px" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: this.api.i18n.t("Center"),
      },
      {
        actionName: "Right",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" width="18px" height="18px" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m38 23h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2zm16-10h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: this.api.i18n.t("Right"),
      },
      {
        actionName: "Justify",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" width="18px" height="18px" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: this.api.i18n.t("Justify"),
      },
    ];
  }

  performAction(actionName: string): void {
    switch (actionName) {
      case "InsertColBefore":
        this._tableConstructor.table.insertColumnBefore();
        break;
      case "InsertColAfter":
        this._tableConstructor.table.insertColumnAfter();
        break;
      case "InsertRowBefore":
        this._tableConstructor.table.insertRowBefore();
        break;
      case "InsertRowAfter":
        this._tableConstructor.table.insertRowAfter();
        break;
      case "DeleteRow":
        this._tableConstructor.table.deleteRow();
        break;
      case "DeleteCol":
        this._tableConstructor.table.deleteColumn();
        break;
      case "TableHeader":
        this._tableConstructor.table.toggleHeader();
        break;
      case "AllBorders":
        this._tableConstructor.table.toggleBorders();
        break;
      case "Left":
      case "Center":
      case "Right":
      case "Justify":
        this.data.textAlignment=actionName;
        this._tableConstructor.table.textALign(actionName);
        break;
    }
  }

  renderSettings(): HTMLDivElement {
    const wrapper = document.createElement("div");

    this.actions.forEach(({ actionName, label, icon }) => {
      const title = this.api.i18n.t(label);
      const button = document.createElement("div");

      button.classList.add("cdx-settings-button");
      button.innerHTML = icon;
      button.title = actionName;

      this.api.tooltip.onHover(button, title, {
        placement: "top",
      });
      button.addEventListener(
        "click",
        this.performAction.bind(this, actionName)
      );
      wrapper.appendChild(button);
      if (this._tableConstructor.table.selectedCell) {
        this._tableConstructor.table.focusCellOnSelectedCell();
      }
    });

    return wrapper;
  }

  render(): HTMLDivElement {
    this.wrapper = document.createElement("div");

    if (this.data && this.data.content) {
      // Creates table if data is present
      this._createTableConfiguration();
    } else {
      // Create table preview if new table is initialized
      this.wrapper.classList.add("table-selector");
      this.wrapper.setAttribute("data-hoveredClass", "m,n");
      const rows = 6;
      this.createCells(rows);
      // Hover to select cells
      this.wrapper.addEventListener("mouseover", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const selectedCell = target.id;
        if (selectedCell.length) {
          const selectedRow = target.getAttribute("row");
          const selectedColumn = target.getAttribute("column");
          if (selectedRow && selectedColumn) {
            this.wrapper?.setAttribute(
              "data-hoveredClass",
              `${selectedRow},${selectedColumn}`
            );
          }
        }
      });

      // Set the select cell to load table config
      this.wrapper.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const selectedCell = target.id;
        if (selectedCell.length) {
          const selectedRow = target.getAttribute("row");
          const selectedColumn = target.getAttribute("column");
          if (selectedRow && selectedColumn) {
            this.wrapper?.removeEventListener("mouseover", () => { });
            this.config.rows = parseInt(selectedRow, 10);
            this.config.cols = parseInt(selectedColumn, 10);
            this._createTableConfiguration();
          }
        }
      });
    }

    return this.wrapper;
  }

  createCells(rows: number): void {
    if (rows !== 0) {
      for (let i = 0; i < rows; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "table-row");
        for (let j = 0; j < rows; j++) {
          let columnDivContainer = document.createElement("div");
          let columnDiv = document.createElement("div");
          columnDivContainer.setAttribute("class", "table-cell-container");
          columnDiv.setAttribute("class", "table-cell");
          columnDivContainer.setAttribute("id", `row_${i + 1}_cell_${j + 1}`);
          columnDivContainer.setAttribute("column", (j + 1).toString());
          columnDivContainer.setAttribute("row", (i + 1).toString());
          columnDiv.setAttribute("id", `cell_${j + 1}`);
          columnDiv.setAttribute("column", (j + 1).toString());
          columnDiv.setAttribute("row", (i + 1).toString());
          columnDivContainer.appendChild(columnDiv);
          rowDiv.appendChild(columnDivContainer);
        }
        this.wrapper?.appendChild(rowDiv);
      }
    }
    const hiddenEl = document.createElement('input');
    hiddenEl.classList.add('hidden-element');
    hiddenEl.setAttribute('tabindex', '0');
    this.wrapper?.appendChild(hiddenEl);
  }

  private _createTableConfiguration(): void {
    this.wrapper!.innerHTML = "";
    this._tableConstructor = new ImportedTableConstructor(
      this.data,
      this.config,
      this.api
    ) as unknown as TableConstructor;;
    this.wrapper!.appendChild(this._tableConstructor.htmlElement);
  }

  save(toolsContent: HTMLElement): TableData {
    const table = toolsContent.querySelector("table") as HTMLTableElement;
    const data: string[][] = [];
    let borders: boolean = false;
    let tableHeader: boolean = false;
    const rows = table ? table.rows : [];

    if (rows.length) {
      console.log(table)
      const hasBorders = table.classList.contains('tc-all-border');
      if (hasBorders) {
        borders = true;
      }

      const hasHeader = table.classList.contains('tc-Header');
      if (hasHeader) {
        tableHeader = true;
      }
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cols = Array.from(row.cells);
        const inputs = cols.map((cell) => cell.querySelector("." + CSS.input) as HTMLElement);
        const isWorthless = inputs.every(this._isEmpty);
        if (isWorthless) {
          continue;
        }

        data.push(inputs.map((input) => input.innerHTML));
      }
    }
    console.log("header, boder", tableHeader, borders)
    return {
      content: data,
      borders: borders,
      tableHeader: tableHeader,
      textAlignment: this.data.textAlignment
    };
  }


  private _isEmpty(input: HTMLElement): boolean {
    return !input.textContent?.trim();
  }

  static get pasteConfig(): { tags: string[] } {
    return {
      tags: ['TABLE', 'TR', 'TD', 'TBODY', 'TH'],
    };
  }

  async onPaste(event: { detail: { data: HTMLElement } }): Promise<void> {
    const table = event.detail.data;
    this.data = this.pasteHandler(table);
    this._createTableConfiguration();
  }

  pasteHandler(element: HTMLElement): TableData {
    const { tagName: tag } = element;
    const data: TableData = {
      content: [],
      config: {
        rows: 0,
        cols: 0
      },
      borders: false,
      tableHeader: false,
      textAlignment: 'Left',
    };
    if (tag === 'TABLE') {
      const tableBodyNodes = Array.from(element.childNodes) as HTMLElement[];
      const tableBodyElement = tableBodyNodes.find(el => el.nodeName === 'TBODY') as HTMLTableSectionElement | undefined;

      if (tableBodyElement) {
        const tableRowNodes = Array.from(tableBodyElement.childNodes) as HTMLElement[];
        const tableRows = tableRowNodes.filter((node): node is HTMLTableRowElement => node.nodeName === 'TR');
        data.config = data.config || {};
        data.config.rows = tableRows.length;
        data.content = tableRows.map((tr) => {
          const tableDataNodes = Array.from(tr.childNodes) as HTMLElement[];
          if (data.config) {
            data.config.cols = tableDataNodes.length;
          }
          const tableData = tableDataNodes.map(td => (td as HTMLElement).innerHTML);
          return tableData;

        });
      }
    }
    return data;

  }
}

import itemsPlanningModalPage from './ItemsPlanningModal.page';
import { PageWithNavbarPage } from '../PageWithNavbar.page';
import {
  generateRandmString,
  selectDateOnDatePicker,
} from '../../Helpers/helper-functions';

export class ItemsPlanningPlanningPage extends PageWithNavbarPage {
  constructor() {
    super();
  }

  public async rowNum(): Promise<number> {
    await browser.pause(500);
    return (await $$('tbody > tr')).length;
  }

  public async planningDeleteDeleteBtn(): Promise<WebdriverIO.Element> {
    const el = await itemsPlanningModalPage.planningDeleteDeleteBtn();
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 40000 });
    return el;
  }

  public async planningDeleteCancelBtn(): Promise<WebdriverIO.Element> {
    const el = await itemsPlanningModalPage.planningDeleteCancelBtn();
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 40000 });
    return el;
  }

  public async clickIdTableHeader() {
    await (await $('th.planningId')).click();
    await (await $('#spinner-animation')).waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public async clickNameTableHeader() {
    await (await $('th.planningName')).click();
    await (await $('#spinner-animation')).waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public async clickDescriptionTableHeader() {
    await (await $('th.planningDescription')).click();
    await (await $('#spinner-animation')).waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public async itemPlanningButton() {
    const el = await $('#items-planning-pn');
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 40000 });
    return el;
  }

  public async planningCreateBtn() {
    const el = await $('#planningCreateBtn');
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 90000 });
    return el;
  }

  public async planningManageTagsBtn() {
    const el = await $('#planningManageTagsBtn');
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 40000 });
    return el;
  }

  public async planningsButton() {
    const el = await $('#items-planning-pn-plannings');
    await el.waitForDisplayed({ timeout: 40000 });
    await el.waitForClickable({ timeout: 40000 });
    return el;
  }

  public async planningId() {
    const el = await $('#planningId');
    await el.waitForDisplayed({ timeout: 40000 });
    return el;
  }
  public async deleteMultiplePluginsBtn() {
    const ele = await $('#deleteMultiplePluginsBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async planningsMultipleDeleteCancelBtn() {
    const ele = await $('#planningsMultipleDeleteCancelBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async planningsMultipleDeleteDeleteBtn() {
    const ele = await $('#planningsMultipleDeleteDeleteBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async selectAllPlanningsCheckbox() {
    const ele = await $('th.mat-column-MtxGridCheckboxColumnDef mat-checkbox');
    // ele.waitForDisplayed({ timeout: 40000 });
    // ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async selectAllPlanningsCheckboxForClick() {
    return (await this.selectAllPlanningsCheckbox()).$('..');
  }

  public async importPlanningsBtn() {
    const ele = await $('#importPlanningsBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async goToPlanningsPage() {
    const spinnerAnimation = await $('#spinner-animation');
    await (await this.itemPlanningButton()).click();
    await (await this.planningsButton()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    await this.planningCreateBtn();
  }

  public async getPlaningByName(namePlanning: string) {
    for (let i = 1; i < (await this.rowNum()) + 1; i++) {
      const planningObj = new PlanningRowObject();
      const planning = await planningObj.getRow(i);
      if (planning.name === namePlanning) {
        return planning;
      }
    }
    return null;
  }

  public async createDummyPlannings(
    template,
    folderName,
    createCount = 3
  ): Promise<PlanningCreateUpdate[]> {
    const masResult = new Array<PlanningCreateUpdate>();
    for (let i = 0; i < createCount; i++) {
      const planningData: PlanningCreateUpdate = {
        name: [
          generateRandmString(),
          generateRandmString(),
          generateRandmString(),
        ],
        eFormName: template,
        description: generateRandmString(),
        repeatEvery: '1',
        repeatType: 'Dag',
        repeatUntil: { year: 2020, day: 15, month: 5 },
        folderName: folderName,
      };
      masResult.push(planningData);
      await itemsPlanningModalPage.createPlanning(planningData);
    }
    return masResult;
  }

  public async clearTable() {
    await browser.pause(2000);
    const rowCount = await itemsPlanningPlanningPage.rowNum();
    for (let i = 1; i <= rowCount; i++) {
      await (await this.getFirstPlanningRowObject()).delete();
    }
  }

  async getAllPlannings(countFirstElements = 0): Promise<PlanningRowObject[]> {
    await browser.pause(1000);
    const resultMas = new Array<PlanningRowObject>();
    if (countFirstElements === 0) {
      countFirstElements = await this.rowNum();
    }
    for (let i = 1; i < countFirstElements + 1; i++) {
      resultMas.push(await new PlanningRowObject().getRow(i));
    }
    return resultMas;
  }

  async getLastPlanningRowObject(): Promise<PlanningRowObject> {
    return await new PlanningRowObject().getRow(await this.rowNum());
  }

  async getFirstPlanningRowObject(): Promise<PlanningRowObject> {
    return await new PlanningRowObject().getRow(1);
  }

  async getPlanningByIndex(i: number): Promise<PlanningRowObject> {
    return await new PlanningRowObject().getRow(i);
  }

  async openMultipleDelete() {
    if (await (await this.deleteMultiplePluginsBtn()).isClickable()) {
      await (await this.deleteMultiplePluginsBtn()).click();
    }
  }

  async closeMultipleDelete(clickCancel = false) {
    if (clickCancel) {
      await (await this.planningsMultipleDeleteCancelBtn()).click();
    } else {
      await (await this.planningsMultipleDeleteDeleteBtn()).click();
      await (await $('#spinner-animation')).waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
    await (await this.planningCreateBtn()).waitForDisplayed({ timeout: 40000 });
  }

  async multipleDelete(clickCancel = false) {
    await this.openMultipleDelete();
    await this.closeMultipleDelete(clickCancel);
  }

  async selectAllPlanningsForDelete(valueCheckbox = true, pickOne = false) {
    if (!pickOne) {
      if (
        (await (await this.selectAllPlanningsCheckbox()).getValue()) !==
        valueCheckbox.toString()
      ) {
        await (await this.selectAllPlanningsCheckboxForClick()).click();
      }
    } else {
      const plannings = await this.getAllPlannings();
      for (let i = 0; i < plannings.length; i++) {
        await plannings[i].clickOnCheckboxForMultipleDelete();
      }
    }
  }
}

const itemsPlanningPlanningPage = new ItemsPlanningPlanningPage();
export default itemsPlanningPlanningPage;

export class PlanningRowObject {
  constructor() {}

  public id: number;
  public name: string;
  public description: string;
  public folderName: string;
  public eFormName: string;
  public tags: string[];
  public repeatEvery: number;
  public repeatType: string;
  public repeatUntil: Date;
  public planningDayOfWeek: string;
  public nextExecution: string;
  public lastExecution: string;
  public updateBtn: WebdriverIO.Element;
  public deleteBtn: WebdriverIO.Element;
  public pairingBtn: WebdriverIO.Element;
  public checkboxDelete: WebdriverIO.Element;
  public checkboxDeleteForClick: WebdriverIO.Element;

  public static async closeEdit(clickCancel = false) {
    if (!clickCancel) {
      await (await itemsPlanningModalPage.planningEditSaveBtn()).click();
      await (await $('#spinner-animation')).waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    } else {
      await (await itemsPlanningModalPage.planningEditCancelBtn()).click();
    }
    await browser.pause(500);
    //await (await itemsPlanningPlanningPage.planningId()).waitForDisplayed();
  }

  public static async closeDelete(clickCancel = false) {
    if (!clickCancel) {
      await (await itemsPlanningPlanningPage.planningDeleteDeleteBtn()).click();
      await (await $('#spinner-animation')).waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    } else {
      await (await itemsPlanningPlanningPage.planningDeleteCancelBtn()).click();
    }
    await browser.pause(500);
  }

  async getRow(rowNum: number): Promise<PlanningRowObject> {
    rowNum = rowNum - 1;
    this.id = +(await (await $$('td.planningId')[rowNum]).getText());
    this.name = await (await $$('td.planningName')[rowNum]).getText();
    this.description = await (await $$('td.planningDescription')[rowNum]).getText();
    this.folderName = await $$('td.planningFolderName')[rowNum].getText();
    this.eFormName = await (await $$('td.planningRelatedEformName')[rowNum]).getText();
    const list = await $$('td.planningTags');
    this.tags = await Promise.all(list.map((element) => element.getText()));
    this.repeatEvery = +await ((await $$('td.planningRepeatEvery')[rowNum]).getText());
    this.repeatType = await (await $$('td.planningRepeatType')[rowNum]).getText();
    // const date = row.$('#planningRepeatUntil').getText();
    // this.repeatUntil = parse(date, 'dd.MM.yyyy HH:mm:ss', new Date());
    this.pairingBtn = await $$('button.planningAssignmentBtn')[rowNum];
    this.updateBtn = await $$('button.updatePlanningBtn')[rowNum];
    this.deleteBtn = await $$('button.deletePlanningBtn')[rowNum];
    this.lastExecution = await (await $$('td.mat-column-lastExecutedTime')[rowNum]).getText();
    this.nextExecution = await (await $$('td.mat-column-nextExecutionTime')[rowNum]).getText();
    this.planningDayOfWeek = await (await $$('td.planningDayOfWeek')[rowNum]).getText();
    // try {
    //   this.checkboxDelete = await $(`#planningCheckbox${rowNum - 1}`);
    // } catch (e) {}
    // try {
    //   this.checkboxDeleteForClick = await this.checkboxDelete.$('..');
    // } catch (e) {}
    return this;
  }

  public async openDelete() {
    await this.deleteBtn.waitForClickable({ timeout: 40000 });
    await this.deleteBtn.click();
    (
      await itemsPlanningPlanningPage.planningDeleteDeleteBtn()
    ).waitForDisplayed({
      timeout: 40000,
    });
  }

  public async openEdit() {
    await this.updateBtn.click();
    await (await $('#spinner-animation')).waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
    await (await itemsPlanningModalPage.planningEditSaveBtn()).waitForDisplayed(
      {
        timeout: 40000,
      }
    );
  }

  async update(
    planning: PlanningCreateUpdate,
    clearTags = false,
    clickCancel = false
  ) {
    await this.openEdit();
    const spinnerAnimation = await $('#spinner-animation');
    const ngOption = await $('.ng-option');
    if (planning.name && planning.name.length > 0) {
      for (let i = 0; i < planning.name.length; i++) {
        if (
          (await (
            await itemsPlanningModalPage.editPlanningItemName(i)
          ).getValue()) !== planning.name[i]
        ) {
          await (await itemsPlanningModalPage.editPlanningItemName(i)).setValue(
            planning.name[i]
          );
        }
      }
    }
    if (
      planning.folderName &&
      (await (
        await (await itemsPlanningModalPage.editFolderName()).$(
          '#editFolderSelectorInput'
        )
      ).getValue()) !== planning.folderName
    ) {
      await itemsPlanningModalPage.selectFolder(planning.folderName);
    }
    if (
      planning.eFormName &&
      (await (
        await (await itemsPlanningModalPage.editPlanningSelector()).$(
          '.ng-value'
        )
      ).getText()) !== planning.eFormName
    ) {
      await (
        await (await itemsPlanningModalPage.editPlanningSelector()).$('input')
      ).setValue(planning.eFormName);
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      await ngOption.waitForDisplayed({ timeout: 40000 });
      await (
        await (
          await (await itemsPlanningModalPage.editPlanningSelector()).$(
            '.ng-dropdown-panel'
          )
        ).$(`.ng-option=${planning.eFormName}`)
      ).click();
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
    if (clearTags) {
      const clearButton = await (
        await itemsPlanningModalPage.editPlanningTagsSelector()
      ).$('span.ng-clear');
      if (await clearButton.isExisting()) {
        await clearButton.click();
      }
    }
    if (planning.tags && planning.tags.length > 0) {
      for (let i = 0; i < planning.tags.length; i++) {
        await (
          await itemsPlanningModalPage.editPlanningTagsSelector()
        ).addValue(planning.tags[i]);
        await browser.keys(['Return']);
      }
    }
    if (
      planning.repeatEvery &&
      (await (await itemsPlanningModalPage.editRepeatEvery()).getValue()) !==
        planning.repeatEvery
    ) {
      await (await itemsPlanningModalPage.editRepeatEvery()).setValue(
        planning.repeatEvery
      );
    }
    if (
      planning.repeatType &&
      (await (
        await (await itemsPlanningModalPage.editRepeatType()).$(
          '.ng-value-label'
        )
      ).getText()) !== planning.repeatType
    ) {
      await (
        await (await itemsPlanningModalPage.editRepeatType()).$('input')
      ).setValue(planning.repeatType);
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      await ngOption.waitForDisplayed({ timeout: 40000 });
      await (
        await (
          await (await itemsPlanningModalPage.editRepeatType()).$(
            'ng-dropdown-panel'
          )
        ).$(`.ng-option=${planning.repeatType}`)
      ).click();
    }
    if (
      planning.repeatUntil &&
      (await (await itemsPlanningModalPage.editRepeatUntil()).getValue()) !==
        `${planning.repeatUntil.month}/${planning.repeatUntil.day}/${planning.repeatUntil.year}`
    ) {
      await (await itemsPlanningModalPage.editRepeatUntil()).click();
      await selectDateOnDatePicker(
        planning.repeatUntil.year,
        planning.repeatUntil.month,
        planning.repeatUntil.day
      );
    }
    if (
      planning.startFrom &&
      (await (await itemsPlanningModalPage.editStartFrom()).getValue()) !==
        `${planning.startFrom.month}/${planning.startFrom.day}/${planning.startFrom.year}`
    ) {
      await (await itemsPlanningModalPage.editStartFrom()).click();
      await selectDateOnDatePicker(
        planning.startFrom.year,
        planning.startFrom.month,
        planning.startFrom.day
      );
    }
    if (
      planning.number &&
      (await (await itemsPlanningModalPage.editItemNumber()).getValue()) !==
        planning.number
    ) {
      await (await itemsPlanningModalPage.editItemNumber()).setValue(
        planning.number
      );
    }
    if (
      planning.description &&
      (await (
        await itemsPlanningModalPage.editPlanningDescription()
      ).getValue()) !== planning.description
    ) {
      await (await itemsPlanningModalPage.editPlanningDescription()).setValue(
        planning.description
      );
    }
    if (
      planning.locationCode &&
      (await (
        await itemsPlanningModalPage.editItemLocationCode()
      ).getValue()) !== planning.locationCode
    ) {
      await (await itemsPlanningModalPage.editItemLocationCode()).setValue(
        planning.locationCode
      );
    }
    if (
      planning.buildYear &&
      (await (await itemsPlanningModalPage.editItemBuildYear()).getValue()) !==
        planning.buildYear
    ) {
      await (await itemsPlanningModalPage.editItemBuildYear()).setValue(
        planning.buildYear
      );
    }
    if (
      planning.type &&
      (await (await itemsPlanningModalPage.editItemType()).getValue()) !==
        planning.type
    ) {
      await (await itemsPlanningModalPage.editItemType()).setValue(
        planning.type
      );
    }
    if (planning.pushMessageEnabled != null) {
      const status = planning.pushMessageEnabled ? 'Aktiveret' : 'Deaktiveret';
      await (
        await (await itemsPlanningModalPage.pushMessageEnabledEdit()).$('input')
      ).setValue(status);
      let value = await (
        await (await itemsPlanningModalPage.pushMessageEnabledEdit()).$(
          'ng-dropdown-panel'
        )
      ).$(`.ng-option=${status}`);
      await value.waitForDisplayed({ timeout: 40000 });
      await value.click();

      await (
        await (
          await itemsPlanningModalPage.editDaysBeforeRedeploymentPushMessage()
        ).$('input')
      ).setValue(planning.daysBeforeRedeploymentPushMessage);
      value = await (
        await (
          await itemsPlanningModalPage.editDaysBeforeRedeploymentPushMessage()
        ).$('ng-dropdown-panel')
      ).$(`.ng-option=${planning.daysBeforeRedeploymentPushMessage}`);
      await value.waitForDisplayed({ timeout: 40000 });
      await value.click();
    }
    await PlanningRowObject.closeEdit(clickCancel);
  }

  async delete(clickCancel = false) {
    await this.openDelete();
    await PlanningRowObject.closeDelete(clickCancel);
  }

  async clickOnCheckboxForMultipleDelete(valueCheckbox = true) {
    if ((await this.checkboxDelete.getValue()) !== valueCheckbox.toString()) {
      await this.checkboxDeleteForClick.click();
    }
  }

  async readPairing(): Promise<{ workerName: string; workerValue: boolean }[]> {
    await this.pairingBtn.click();
    await browser.pause(500);
    const changeAssignmentsCancel = await $('#changeAssignmentsCancel');
    await changeAssignmentsCancel.waitForClickable({
      timeout: 40000,
    });
    let pairings: { workerName: string; workerValue: boolean }[] = [];
    const pairingTable = await $$('#pairingModalTableBody  tr.mat-row');
    for (let i = 0; i < pairingTable.length; i++) {
      const workerName = await (await pairingTable[i].$$('td.mat-cell')[1]).getText();
      const workerValue =
        (await (
          await (await pairingTable[i].$$('td')[2]).$('.mat-checkbox-input')
        ).getAttribute('aria-checked')) === 'true';
      pairings = [...pairings, { workerName, workerValue }];
    }
    await changeAssignmentsCancel.click();
    return pairings;
  }
}

export class PlanningCreateUpdate {
  public name: string[];
  public folderName: string;
  public eFormName: string;
  public tags?: string[];
  public repeatEvery?: string;
  public repeatType?: string;
  public startFrom?: { month: number; day: number; year: number };
  public repeatUntil?: { month: number; day: number; year: number };
  public number?: string;
  public description?: string;
  public locationCode?: string;
  public buildYear?: string;
  public type?: string;
  public pushMessageEnabled?: boolean;
  public daysBeforeRedeploymentPushMessage?: number;
}

//BeforeEach ploki muutujad
const getCookiesPopup = () => cy.get(".sliding-popup-bottom");
const getCookiesAcceptButton = () =>
  cy.get('[data-textet="Nõustun kõigi küpsistega"]');
const getHomeLoanCalculator = () => cy.get(".c-hero--calculator");
const getMaxLoanCalcButton = () => cy.get('[href="#loan-tab--2"]');

beforeEach(() => {
  cy.visit("https://www.cooppank.ee/kodulaen");
  getCookiesPopup()
    .should("be.visible")
    .then(($cookieBanner) => {
      if ($cookieBanner.length > 0) {
        getCookiesAcceptButton().click().should("not.exist");
      }
    });
  getHomeLoanCalculator()
    .first()
    .within(() => {
      getMaxLoanCalcButton().click();
    });
});

describe("Maksimaalse laenusumma kalkulaator", () => {
  it("'Taotlen üksi' valikul sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(0)
          .should("contain", "Taotlen üksi")
          .click();
        getEditMonthlyIncome().click().clear().type(value2000);

        getEditDependantsNumber().select("1").should("have.value", "1");

        getEditTotalBlanceExistingLoans().click().clear().type(value5000);

        getEditTotalMonthlyObligations().click().clear().type(value300);

        changeSliderValue();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  it("'Kaastaotlejaga' valikul sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(1)
          .should("contain", "Kaastaotlejaga")
          .click();
        getEditMonthlyIncome().click().clear().type(value2000);

        getEditDependantsNumber().select("1").should("have.value", "1");

        getEditTotalBlanceExistingLoans().click().clear().type(value5000);

        getEditTotalMonthlyObligations().click().clear().type(value300);

        changeSliderValue();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  it("'Taotlen üksi' valikul 'Igakuine netosissetulek' sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(0)
          .should("contain", "Taotlen üksi")
          .click();
        getEditMonthlyIncome().click().clear().type(value2000);
        //Kliki väljaspool tekstikasti
        clickOutsideTextField().click();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  it("'Kaastaotlejaga' valikul 'Igakuine netosissetulek' sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(1)
          .should("contain", "Kaastaotlejaga")
          .click();
        getEditMonthlyIncome().click().clear().type(value2000);
        //Kliki väljaspool tekstikasti
        clickOutsideTextField().click();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  it("'Taotlen üksi' valikul ‘Ülalpeetavate arv’ rippmenüü sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(0)
          .should("contain", "Taotlen üksi")
          .click();
        getEditDependantsNumber().select("2").should("have.value", "2");
        //Kliki väljaspool tekstikasti
        clickOutsideTextField().click();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  it("'Kaastaotlejaga' valikul ‘Ülalpeetavate arv’ rippmenüü sisendi muutmisel kalkulaator arvutab uue tulemuse", () => {
    getCalculator()
      .first()
      .within(() => {
        getLoanTabSwitcher()
          .children()
          .should("have.length", 2)
          .eq(1)
          .should("contain", "Kaastaotlejaga")
          .click();
        getEditDependantsNumber().select("2").should("have.value", "2");
        //Kliki väljaspool tekstikasti
        clickOutsideTextField().click();

        //Veendu, et kalkulaatori väärtus on muutunud ja ei ole võrdne lähteväärtusega
        getCalculatorResult()
          .children()
          .first()
          .invoke("text")
          .should("not.equal", maksimaalneLaenusummaLähteväärtus);
      });
  });

  //Describe ploki muutujad:
  const getCalculator = () => cy.get(".max-loan-amount-calculator");
  const getLoanTabSwitcher = () => cy.get(".loan-tab-switcher-coapplicant");
  const getEditMonthlyIncome = () =>
    cy.get('[data-drupal-selector="edit-monthly-income"]');
  const clickOutsideTextField = () =>
    cy.get('[data-plural="Igakuised sissetulekud kokku"]');
  const getEditDependantsNumber = () =>
    cy.get('[data-drupal-selector="edit-dependants-number"]');
  const getEditTotalBlanceExistingLoans = () =>
    cy.get('[id="edit-total-blance-existing-loans"]');
  const getEditTotalMonthlyObligations = () =>
    cy.get('[id="edit-total-monthly-obligations"]');
  const getCalculatorResult = () =>
    cy.get(".c-form-field__summary.calculation-result");
  const getSlider = () => cy.get(".ui-slider-handle");

  //Funktsioonid
  function changeSliderValue() {
    let changeValue = "-48";
    let uuendatudPerioodAastates = "24 aastat";
    getSlider().then(($slider) => {
      // Slideri lohistamine uude kohta
      cy.wrap($slider)
        .trigger("mousedown", { which: 1, pageX: 0, pageY: 0 })
        .trigger("mousemove", {
          which: 1,
          pageX: changeValue,
          pageY: 0,
        })
        .trigger("mouseup");
      // Kinnita, et uus väärtus on nähtav liuguril
      getSlider().should("have.attr", "style", `left: 79.3103%;`);
      cy.wait(1000);
      // Kinnita, et perioodil kajastub uus väärtus
      cy.get(".slider-ammount").should("contain", uuendatudPerioodAastates);
    });
  }

  //Kalkulaatori numbrilised väärtused
  const value2000 = "2000";
  const value5000 = "5000";
  const value300 = "300";
  const maksimaalneLaenusummaLähteväärtus = "28 522";
});

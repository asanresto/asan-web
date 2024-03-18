export const identifyCssRules = (doc: Document) => {
  const screenRules: CSSMediaRule[] = [];
  const printRules: CSSMediaRule[] = [];
  const styleSheets = doc.styleSheets;

  for (let i = 0; i < styleSheets.length; i++) {
    const sheet = styleSheets.item(i);
    const rules = sheet?.cssRules;
    if (!rules) {
      continue;
    }
    for (let j = 0; j < rules.length; j++) {
      const rule = rules?.item(j);
      if (!rule) {
        continue;
      }

      if (rule.constructor.name === "CSSMediaRule") {
        const mediaRule = rule as CSSMediaRule;
        if (mediaRule.conditionText === "print") {
          printRules.push(mediaRule);
        } else if (mediaRule.conditionText === "screen") {
          screenRules.push(mediaRule);
        }
      }
    }
  }

  return {
    printRules: printRules,
    screenRules: screenRules,
  };
};

const simulatePrintMediaQuery = (rules: { printRules: CSSMediaRule[]; screenRules: CSSMediaRule[] }) => {
  for (const rule of rules.screenRules) {
    rule.media.mediaText = "disabled";
  }

  for (const rule of rules.printRules) {
    rule.media.mediaText = "screen";
  }
};

const simulatePrintLink = (sheet: HTMLLinkElement) => {
  if (sheet.media === "screen") {
    sheet.disabled = true;
  }
  if (sheet.media === "print") {
    sheet.title = "print-disabled";
    sheet.media = "";
  }
};

const restorePrintMediaQuery = (rules: { printRules: CSSMediaRule[]; screenRules: CSSMediaRule[] }) => {
  for (const rule of rules.screenRules) {
    rule.media.mediaText = "screen";
  }

  for (const rule of rules.printRules) {
    rule.media.mediaText = "print";
  }
};

const restoreScreenLink = (sheet: HTMLLinkElement) => {
  if (sheet.media === "screen") {
    sheet.disabled = false;
  }
  if (sheet.title === "print-disabled") {
    sheet.title = "";
    sheet.media = "print";
  }
};

export const emulatePrintMedia = (doc: Document | null) => {
  if (!doc) {
    return;
  }
  const rules = identifyCssRules(doc);
  simulatePrintMediaQuery(rules);

  const links = doc.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    simulatePrintLink(links[i] as HTMLLinkElement);
  }
};

export const restoreScreenMedia = (doc: Document | null) => {
  if (!doc) {
    return;
  }
  const rules = identifyCssRules(doc);
  restorePrintMediaQuery(rules);

  const links = doc.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    restoreScreenLink(links[i] as HTMLLinkElement);
  }
};

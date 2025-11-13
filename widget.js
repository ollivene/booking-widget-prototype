/* eslint-disable no-console */
(function () {
  const COPY_PRESETS = {
    en: {
      heroTitle: "Online booking",
      heroBody:
        "If your pet is experiencing a medical emergency, please call us 12 34 56 78. This text can be modified through Provet settings.",
      speciesCta: "Select",
      showAllLabel: (extra) => `Show all (+${extra})`,
      hideLabel: "Show less",
      reasonsTitle: "Select reason for visit",
      reasonsSubtitle: (count) => `${count} ${count === 1 ? "reason" : "reasons"}`,
      stepOneLabel: "Step 1",
      stepOneTitle: "Select species",
      stepTwoLabel: "Step 2",
      stepTwoTitle: "Select reason",
      stepTwoPlaceholder:
        "Choose the species first to see which visits are available for online booking.",
      noReasonsMessage:
        "Online booking is not currently available for the selected species. Please contact the clinic.",
      backToSpeciesLabel: "Change species",
      selectedSpeciesLabel: "Selected species",
    reasonActionLabel: "Book",
      poweredBy: "Powered by Provet",
    },
    fi: {
      heroTitle: "Varaa aika verkossa",
      heroBody:
        "Jos lemmikilläsi on hätätilanne, soita meille 12 34 56 78. Tekstiä voidaan muokata Provet-asetuksissa.",
      speciesCta: "Valitse",
      showAllLabel: (extra) => `Näytä kaikki (+${extra})`,
      hideLabel: "Näytä vähemmän",
      reasonsTitle: "Valitse käynnin syy",
      reasonsSubtitle: (count) => `${count} ${count === 1 ? "vaihtoehto" : "vaihtoehtoa"}`,
      stepOneLabel: "Vaihe 1",
      stepOneTitle: "Valitse eläinlaji",
      stepTwoLabel: "Vaihe 2",
      stepTwoTitle: "Valitse tulosyy",
      stepTwoPlaceholder:
        "Valitse ensin eläinlaji nähdäksesi saatavilla olevat käynnit verkkovaraukseen.",
      noReasonsMessage:
        "Verkkovaraus ei ole juuri nyt saatavilla valitulle lajille. Ole hyvä ja ota yhteyttä klinikkaan.",
      backToSpeciesLabel: "Vaihda eläinlaji",
      selectedSpeciesLabel: "Valittu laji",
    reasonActionLabel: "Varaa",
      poweredBy: "Powered by Provet",
    },
    sv: {
      heroTitle: "Boka tid online",
      heroBody:
        "Om ditt djur är i ett akutfall, ring oss 12 34 56 78. Texten kan ändras i Provet-inställningarna.",
      speciesCta: "Välj",
      showAllLabel: (extra) => `Visa alla (+${extra})`,
      hideLabel: "Visa färre",
      reasonsTitle: "Välj besöksorsak",
      reasonsSubtitle: (count) => `${count} ${count === 1 ? "alternativ" : "alternativ"}`,
      stepOneLabel: "Steg 1",
      stepOneTitle: "Välj djurslag",
      stepTwoLabel: "Steg 2",
      stepTwoTitle: "Välj besöksorsak",
      stepTwoPlaceholder:
        "Välj djurslag först för att se vilka besök som kan bokas online.",
      noReasonsMessage:
        "Onlinebokning är inte tillgänglig för det valda djurslaget just nu. Kontakta kliniken.",
      backToSpeciesLabel: "Byt djurslag",
      selectedSpeciesLabel: "Valt djurslag",
    reasonActionLabel: "Boka",
      poweredBy: "Powered by Provet",
    },
  };

  const DEFAULT_CONFIG = {
    clinicName: "Small Animal Clinic",
    language: "en",
    theme: {
      primaryColor: "#401196",
      backgroundColor: "#ffffff",
      textColor: "#101840",
    },
    layout: {
      featuredSpeciesLimit: 2,
      defaultCategoryOpen: true,
    },
    species: [
      { id: "dog", label: "Dog", icon: "🐶" },
      { id: "cat", label: "Cat", icon: "🐱" },
      { id: "rabbit", label: "Rabbit", icon: "🐰" },
      { id: "other", label: "Other pets", icon: "🐾" },
    ],
    reasons: [
      {
        id: "consultation-20",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Consultation 20 min",
        duration: "20 min",
        category: "Consultation",
        treatment: "76",
        openInNewTab: true,
      },
      {
        id: "consultation-40",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Consultation 40 min",
        duration: "40 min",
        category: "Consultation",
        treatment: "77",
        openInNewTab: true,
      },
      {
        id: "consultation-60",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Consultation 60 min",
        duration: "60 min",
        category: "Consultation",
        treatment: "78",
        openInNewTab: true,
      },
      {
        id: "ear-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Ear investigation with sedation 40 min",
        duration: "40 min",
        category: "Diagnostics",
        treatment: "68",
        openInNewTab: true,
      },
      {
        id: "eye-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Eye investigation 40 min",
        duration: "40 min",
        category: "Diagnostics",
        treatment: "69",
        openInNewTab: true,
      },
      {
        id: "itching-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Itching investigation 40 min",
        duration: "40 min",
        category: "Diagnostics",
        treatment: "66",
        openInNewTab: true,
      },
      {
        id: "health-check-60",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Health check 60 min",
        duration: "60 min",
        category: "Health check",
        treatment: "89",
        openInNewTab: true,
      },
      {
        id: "recovery-checkup",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Recovery check-up 40 min",
        duration: "40 min",
        category: "Health check",
        treatment: "92",
        openInNewTab: true,
      },
    ],
  };

  class BookingWidget {
    constructor(host, shadowRoot, config) {
      this.host = host;
      this.shadowRoot = shadowRoot;
      this.config = config;
      this.state = {
        selectedSpeciesId: null,
        showAllSpecies: false,
        currentStep: "species",
        openCategories: {},
      };

      this.wrapper = null;
      this.speciesList = null;
      this.speciesSection = null;
      this.reasonsSection = null;
      this.reasonsContainer = null;
      this.summaryValue = null;

      this.build();
    }

    build() {
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }

      const style = document.createElement("style");
      style.textContent = createStyles(this.config.theme);
      this.shadowRoot.appendChild(style);

      this.wrapper = this.el("div", { class: "booking-widget" });
      this.shadowRoot.appendChild(this.wrapper);

      this.wrapper.appendChild(this.renderHeaderSection());
      this.speciesSection = this.renderSpeciesSection();
      this.wrapper.appendChild(this.speciesSection);
      this.reasonsSection = this.renderReasonsSection();
      this.wrapper.appendChild(this.reasonsSection);
      
      const footer = this.el("div", { class: "booking-widget__footer", text: this.config.copy.poweredBy });
      this.wrapper.appendChild(footer);
      
      this.renderSpeciesCards();
      this.renderReasons();
      this.updateSelectedSpeciesSummary();
      this.syncStepVisibility({ scroll: false });
    }

    renderHeaderSection() {
      const header = this.el("div", { class: "booking-widget__header" });
      const title = this.el("h1", {
        class: "booking-widget__title",
        text: interpolate(this.config.copy.heroTitle, this.config.clinicName),
      });
      const subtitle = this.el("p", {
        class: "booking-widget__subtitle",
        text: interpolate(this.config.copy.heroBody, this.config.clinicName),
      });
      header.append(title, subtitle);
      return header;
    }

    el(tag, { class: className, text, dataset, attrs } = {}) {
      const element = document.createElement(tag);
      if (className) {
        element.className = className;
      }
      if (typeof text === "string") {
        element.textContent = text;
      }
      if (dataset) {
        Object.entries(dataset).forEach(([key, value]) => {
          element.dataset[key] = value;
        });
      }
      if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
      return element;
    }

    renderSpeciesSection() {
      const section = this.el("section", {
        class: "booking-widget__section",
        dataset: { section: "species" },
      });

      section.appendChild(
        buildStepHeader(this.el.bind(this), {
          stepLabel: this.config.copy.stepOneLabel,
          title: this.config.copy.stepOneTitle,
        })
      );

      this.speciesList = this.el("div", { class: "species-list" });
      section.appendChild(this.speciesList);

      const footer = this.el("div", { class: "species-footer" });
      const hiddenCount = Math.max(
        this.config.species.length - this.config.layout.featuredSpeciesLimit,
        0
      );

      if (hiddenCount > 0) {
        const toggle = this.el("button", {
          class: "species-footer__button",
          text: this.config.copy.showAllLabel(hiddenCount),
        });
        toggle.addEventListener("click", () => {
          this.state.showAllSpecies = !this.state.showAllSpecies;
          toggle.textContent = this.state.showAllSpecies
            ? this.config.copy.hideLabel
            : this.config.copy.showAllLabel(hiddenCount);
          this.renderSpeciesCards();
        });
        footer.appendChild(toggle);
      }

      section.appendChild(footer);
      return section;
    }

    renderReasonsSection() {
      const section = this.el("section", {
        class: "booking-widget__section",
        dataset: { section: "reasons" },
      });

      const summary = this.el("div", { class: "step-summary" });
      const summaryInfo = this.el("div", { class: "step-summary__info" });

      summaryInfo.append(
        this.el("span", {
          class: "step-summary__label",
          text: this.config.copy.selectedSpeciesLabel,
        })
      );
      this.summaryValue = this.el("span", { class: "step-summary__value", text: "—" });
      summaryInfo.append(this.summaryValue);

      const changeButton = this.el("button", {
        class: "step-summary__action",
        text: this.config.copy.backToSpeciesLabel,
      });
      changeButton.addEventListener("click", () => {
        this.state.currentStep = "species";
        this.refreshSpeciesSelection();
        this.syncStepVisibility();
      });

      summary.append(summaryInfo, changeButton);

      const header = this.el("div", { class: "reasons-section__header" });
      const title = this.el("h2", {
        class: "reasons-section__title",
        text: this.config.copy.reasonsTitle,
      });
      header.appendChild(title);

      this.reasonsContainer = this.el("div", { class: "reasons-section__categories" });

      section.append(summary, header, this.reasonsContainer);

      return section;
    }

    renderSpeciesCards() {
      if (!this.speciesList) return;
      this.speciesList.innerHTML = "";

      const items = this.state.showAllSpecies
        ? this.config.species
        : this.config.species.slice(0, this.config.layout.featuredSpeciesLimit);

      items.forEach((species) => {
        this.speciesList.appendChild(this.renderSpeciesCard(species));
      });

      this.refreshSpeciesSelection();
    }

    renderSpeciesCard(species) {
      const card = this.el("article", {
        class: `species-card${this.state.selectedSpeciesId === species.id ? " is-selected" : ""}`,
        dataset: { speciesId: species.id },
      });

      const icon = this.el("span", { class: "species-card__icon", text: species.icon || "🐾" });
      const name = this.el("div", { class: "species-card__name", text: species.label });
      const action = this.el("button", {
        class: "species-card__action",
        text: this.config.copy.speciesCta,
      });

      action.addEventListener("click", () => {
        this.state.selectedSpeciesId = species.id;
        this.state.currentStep = "reasons";
        this.renderReasons();
        this.refreshSpeciesSelection();
        this.updateSelectedSpeciesSummary();
        this.syncStepVisibility();
        dispatchHostEvent(this.host, "species-selected", {
          speciesId: species.id,
          label: species.label,
        });
      });

      card.append(icon, name, action);
      return card;
    }

    refreshSpeciesSelection() {
      const cards = this.speciesList?.querySelectorAll(".species-card") ?? [];
      cards.forEach((card) => {
        const { speciesId } = card.dataset;
        card.classList.toggle("is-selected", speciesId === this.state.selectedSpeciesId);
      });
    }

    renderReasons() {
      if (!this.reasonsContainer) {
        return;
      }

      const currentSpecies = this.state.selectedSpeciesId;
      const filteredReasons = !currentSpecies
        ? []
        : this.config.reasons.filter((reason) => reason.species?.includes(currentSpecies));

      if (!currentSpecies) {
        this.reasonsContainer.innerHTML = "";
        this.reasonsContainer.appendChild(
          this.renderPlaceholderCard(this.config.copy.stepTwoPlaceholder)
        );
        return;
      }

      if (filteredReasons.length === 0) {
        this.reasonsContainer.innerHTML = "";
        this.reasonsContainer.appendChild(
          this.renderPlaceholderCard(this.config.copy.noReasonsMessage)
        );
        return;
      }

      this.reasonsContainer.innerHTML = "";

      const categories = new Map();
      filteredReasons.forEach((reason) => {
        if (!categories.has(reason.category)) {
          categories.set(reason.category, []);
        }
        categories.get(reason.category).push(reason);
      });

      let isFirstCategory = true;
      categories.forEach((reasons, categoryName) => {
        const category = this.el("div", { class: "category" });
        const header = this.el("div", { class: "category__header" });
        
        // Open first category by default if not explicitly set
        let isOpen = this.state.openCategories[categoryName];
        if (isOpen === undefined && isFirstCategory) {
          isOpen = true;
          this.state.openCategories[categoryName] = true;
        }

        const headerContent = this.el("div", { class: "category__header-content" });
        headerContent.append(
          this.el("div", { class: "category__name", text: categoryName }),
          this.el("div", {
            class: "category__count",
            text: this.config.copy.reasonsSubtitle(reasons.length),
          })
        );

        const chevron = this.el("div", { class: "category__chevron" });
        chevron.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        
        header.append(headerContent, chevron);

        const body = this.el("div", { class: "category__body" });
        if (!isOpen) {
          body.setAttribute("hidden", "hidden");
          header.classList.add("is-collapsed");
        }

        reasons.forEach((reason) => body.appendChild(this.renderReasonCard(reason)));

        header.addEventListener("click", () => {
          const wasHidden = body.hasAttribute("hidden");
          if (wasHidden) {
            body.removeAttribute("hidden");
            header.classList.remove("is-collapsed");
            this.state.openCategories[categoryName] = true;
          } else {
            body.setAttribute("hidden", "hidden");
            header.classList.add("is-collapsed");
            this.state.openCategories[categoryName] = false;
          }
        });

        category.append(header, body);
        this.reasonsContainer.appendChild(category);
        isFirstCategory = false;
      });
    }

    renderReasonCard(reason) {
      const card = this.el("div", { class: "reason-card" });
      
      const info = this.el("div", { class: "reason-card__info" });
      const name = this.el("div", { class: "reason-card__name", text: reason.title });
      const duration = this.el("span", { class: "reason-card__duration", text: reason.duration });
      info.append(name, duration);
      
      const actionButton = this.el("button", {
        class: "reason-card__action",
        text: this.config.copy.reasonActionLabel,
        attrs: { type: "button" },
      });

      const handleNavigate = () => {
        const bookingUrl = reason.bookingUrl || this.config.bookingUrl;
        dispatchHostEvent(this.host, "reason-selected", {
          speciesId: this.state.selectedSpeciesId,
          reasonId: reason.id,
          bookingUrl,
        });
        this.navigateToBooking(reason);
      };

      actionButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleNavigate();
      });

      card.append(info, actionButton);

      return card;
    }

    renderPlaceholderCard(text) {
      const wrapper = this.el("div", { class: "placeholder-card" });
      wrapper.appendChild(this.el("p", { class: "placeholder-card__text", text }));
      return wrapper;
    }

    updateSelectedSpeciesSummary() {
      if (!this.summaryValue) return;
      const species = this.config.species.find(
        (item) => item.id === this.state.selectedSpeciesId
      );
      this.summaryValue.textContent = species ? species.label : "—";
    }

    syncStepVisibility({ scroll = true } = {}) {
      const speciesVisible = this.state.currentStep === "species";
      if (this.speciesSection) {
        this.speciesSection.classList.toggle("is-hidden", !speciesVisible);
      }
      if (this.reasonsSection) {
        this.reasonsSection.classList.toggle("is-hidden", speciesVisible);
      }

      if (!scroll) return;
      const target = speciesVisible ? this.speciesSection : this.reasonsSection;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    navigateToBooking(reason) {
      let bookingUrl = reason?.bookingUrl || this.config.bookingUrl;
      if (!bookingUrl) {
        console.warn("[ProvetWidget] bookingUrl missing for reason:", reason);
        return;
      }

      // If reason has a treatment code and no custom bookingUrl, append it to the base URL
      if (reason?.treatment && !reason.bookingUrl) {
        bookingUrl = `${bookingUrl}?treatment=${reason.treatment}`;
      }

      const shouldOpenNewTab = Boolean(
        (reason && reason.openInNewTab) || this.config.openBookingInNewTab
      );

      if (shouldOpenNewTab) {
        window.open(bookingUrl, "_blank", "noopener");
        return;
      }

      window.location.href = bookingUrl;
    }
  }

  function buildStepHeader(createElement, { stepLabel, title }) {
    const container = createElement("div", { class: "step-header" });
    container.append(
      createElement("h3", { class: "step-header__title", text: title })
    );
    return container;
  }

  function sanitizeColor(value, fallback) {
    if (typeof value !== "string") {
      return fallback;
    }
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    return trimmed;
  }

  function createStyles(theme) {
    const primary = sanitizeColor(theme.primaryColor, "#5A32FF");
    const background = sanitizeColor(theme.backgroundColor, "#f4f6fb");
    const text = sanitizeColor(theme.textColor, "#101840");

    return `
      :host {
        all: initial;
        display: block;
        color-scheme: only light;
        font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
        --provet-primary: ${primary};
        --provet-primary-contrast: #ffffff;
        --provet-bg: ${background};
        --provet-card-bg: #f9fafb;
        --provet-text-primary: ${text};
        --provet-text-secondary: #69707d;
        --provet-border: #e1e7f5;
        --provet-radius-lg: 18px;
        --provet-radius-sm: 12px;
        --provet-shadow: 0 10px 30px rgba(16, 24, 64, 0.05);
      }

      *, *::before, *::after {
        box-sizing: border-box;
        font-family: inherit;
      }

      .booking-widget {
        max-width: 720px;
        margin: 0 auto;
        padding: 32px 24px 24px;
        display: flex;
        flex-direction: column;
        gap: 28px;
        background: var(--provet-bg);
        border: 1px solid rgba(16, 24, 64, 0.1);
        border-radius: 16px;
      }

      .booking-widget__header {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 4px;
      }

      .booking-widget__title {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: var(--provet-text-primary);
      }

      .booking-widget__subtitle {
        margin: 0;
        font-size: 16px;
        line-height: 1.6;
        color: var(--provet-text-secondary);
      }

      .booking-widget__section {
        background: transparent;
        border-radius: var(--provet-radius-lg);
        box-shadow: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .booking-widget__section.is-hidden {
        display: none;
      }

      .step-header {
        display: flex;
        align-items: baseline;
        gap: 12px;
      }

      .step-header__badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(64, 17, 150, 0.12);
        color: var(--provet-primary);
        font-weight: 600;
        font-size: 13px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 6px 12px;
        border-radius: 999px;
      }

      .step-header__title {
        margin: 0;
        font-size: 26px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .species-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .species-card {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 20px;
        padding: 24px 28px;
        min-height: 96px;
        border: 1px solid rgba(16, 24, 64, 0.08);
        background: var(--provet-card-bg);
        border-radius: 20px;
        transition: transform 140ms ease, border-color 140ms ease;
      }

      .species-card:hover {
        transform: translateY(-1px);
        border-color: rgba(64, 17, 150, 0.25);
      }

      .species-card.is-selected {
        border-color: rgba(64, 17, 150, 0.45);
      }

      .species-card__icon {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        font-size: 28px;
        border-radius: 16px;
        background: rgba(64, 17, 150, 0.12);
      }

      .species-card__name {
        font-size: 20px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .species-card__action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        padding: 0 28px;
        border-radius: 16px;
        border: none;
        font-weight: 600;
        font-size: 16px;
        background: var(--provet-primary);
        color: var(--provet-primary-contrast);
        cursor: pointer;
        transition: transform 120ms ease, filter 120ms ease;
      }

      .species-card__action:hover {
        filter: brightness(1.05);
      }

      .species-card__action:active {
        transform: scale(0.97);
      }

      .species-footer {
        display: flex;
        justify-content: center;
        margin-top: 4px;
      }

      .species-footer__button {
        border-radius: 999px;
        border: 1px solid rgba(16, 24, 64, 0.12);
        background: var(--provet-card-bg);
        color: var(--provet-text-primary);
        font-weight: 600;
        font-size: 16px;
        padding: 12px 28px;
        cursor: pointer;
        transition: border-color 120ms ease, transform 120ms ease;
      }

      .species-footer__button:hover {
        border-color: var(--provet-primary);
      }

      .reasons-section__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding-top: 32px;
        margin-bottom: 4px;
      }

      .reasons-section__title {
        margin: 0;
        font-size: 26px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .reasons-section__subtitle {
        margin: 0;
        font-size: 16px;
        color: var(--provet-text-secondary);
      }

      .step-summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 18px;
        padding: 22px 24px;
        border-radius: var(--provet-radius-lg);
        border: 1px solid var(--provet-border);
        background: rgba(90, 50, 255, 0.05);
      }

      .step-summary__info {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .step-summary__label {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--provet-text-secondary);
      }

      .step-summary__value {
        font-size: 17px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .step-summary__action {
        padding: 10px 20px;
        border-radius: 999px;
        border: 1px solid rgba(64, 17, 150, 0.2);
        background: rgba(64, 17, 150, 0.1);
        color: var(--provet-primary);
        font-weight: 600;
        cursor: pointer;
        transition: transform 120ms ease, border-color 120ms ease;
      }

      .step-summary__action:hover {
        transform: translateY(-1px);
        border-color: rgba(64, 17, 150, 0.45);
      }

      .category {
        margin-bottom: 24px;
      }

      .category__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        cursor: pointer;
        background: transparent;
        transition: opacity 120ms ease;
      }

      .category__header:hover {
        opacity: 0.7;
      }

      .category__header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        gap: 16px;
      }

      .category__name {
        font-size: 22px;
        font-weight: 700;
        color: var(--provet-text-primary);
      }

      .category__count {
        font-size: 15px;
        font-weight: 400;
        color: var(--provet-text-secondary);
      }

      .category__chevron {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-left: 12px;
        color: var(--provet-text-secondary);
        transition: transform 200ms ease;
      }

      .category__header.is-collapsed .category__chevron {
        transform: rotate(-90deg);
      }

      .category__body {
        padding-top: 8px;
      }

      .category__body[hidden] {
        display: none;
      }

      .reason-card {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 20px;
        padding: 24px 28px;
        min-height: 88px;
        border: 1px solid rgba(16, 24, 64, 0.08);
        background: var(--provet-card-bg);
        border-radius: 20px;
        margin-bottom: 12px;
        transition: transform 140ms ease, border-color 140ms ease;
      }

      .reason-card:hover {
        transform: translateY(-1px);
        border-color: rgba(64, 17, 150, 0.25);
      }

      .reason-card__info {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .reason-card__name {
        font-size: 17px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .reason-card__duration {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        font-size: 14px;
        font-weight: 600;
        color: var(--provet-primary);
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(64, 17, 150, 0.1);
      }

      .reason-card__action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        padding: 0 28px;
        border-radius: 16px;
        border: none;
        font-weight: 600;
        font-size: 16px;
        background: var(--provet-primary);
        color: var(--provet-primary-contrast);
        cursor: pointer;
        transition: transform 120ms ease, filter 120ms ease;
      }

      .reason-card__action:hover {
        filter: brightness(1.05);
      }

      .reason-card__action:active {
        transform: scale(0.97);
      }

      .placeholder-card {
        display: grid;
        place-items: center;
        text-align: center;
        padding: 42px 32px;
        background: #fbfcff;
        border-radius: var(--provet-radius-lg);
        border: 1px dashed var(--provet-border);
      }

      .placeholder-card__text {
        max-width: 420px;
        margin: 0;
        line-height: 1.6;
        color: var(--provet-text-secondary);
      }

      .booking-widget__footer {
        margin-top: 16px;
        padding-top: 0;
        text-align: center;
        font-size: 13px;
        color: var(--provet-text-secondary);
        opacity: 0.7;
      }

      @media (max-width: 640px) {
        .booking-widget {
          padding: 24px 16px 32px;
        }

        .booking-widget__section {
          padding: 24px;
        }

        .booking-widget__title {
          font-size: 30px;
        }

        .step-summary {
          flex-direction: column;
          align-items: stretch;
          gap: 16px;
        }

        .step-summary__action {
          width: 100%;
          text-align: center;
        }
      }
    `;
  }

  function interpolate(text, clinicName) {
    if (typeof text !== "string") return text;
    return text.replace("{CLINIC}", clinicName ?? "");
  }

  function dispatchHostEvent(host, name, detail) {
    host.dispatchEvent(
      new CustomEvent(`provet-widget:${name}`, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  function normalizeFormatter(value, fallback) {
    if (typeof value === "function") {
      return value;
    }
    if (typeof value === "string") {
      return () => value;
    }
    return typeof fallback === "function" ? fallback : () => fallback;
  }

  function mergeDeep(target, source) {
    if (Array.isArray(source)) {
      return source.slice();
    }
    const output = { ...(target || {}) };
    if (!source || typeof source !== "object") {
      return output;
    }
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      if (Array.isArray(sourceValue)) {
        output[key] = sourceValue.slice();
      } else if (sourceValue && typeof sourceValue === "object") {
        output[key] = mergeDeep(output[key] || {}, sourceValue);
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue;
      }
    });
    return output;
  }

  function parseNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function parseBool(value, fallback) {
    if (value === undefined) return fallback;
    if (value === "true") return true;
    if (value === "false") return false;
    return fallback;
  }

  function parseJSON(value, fallback) {
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch (_error) {
      console.warn("[ProvetWidget] Failed to parse JSON:", _error);
      return fallback;
    }
  }

  function parseDataConfig(script) {
    const overrides = parseJSON(script.dataset.config, {});

    if (script.dataset.clinic) {
      overrides.clinicName = script.dataset.clinic;
    }
    if (script.dataset.lang) {
      overrides.language = script.dataset.lang;
    }
    if (script.dataset.primaryColor || script.dataset.backgroundColor || script.dataset.textColor) {
      overrides.theme = overrides.theme || {};
      if (script.dataset.primaryColor) overrides.theme.primaryColor = script.dataset.primaryColor;
      if (script.dataset.backgroundColor) overrides.theme.backgroundColor = script.dataset.backgroundColor;
      if (script.dataset.textColor) overrides.theme.textColor = script.dataset.textColor;
    }
    if (script.dataset.featuredSpeciesLimit) {
      overrides.layout = overrides.layout || {};
      overrides.layout.featuredSpeciesLimit = parseNumber(
        script.dataset.featuredSpeciesLimit,
        DEFAULT_CONFIG.layout.featuredSpeciesLimit
      );
    }
    if (script.dataset.defaultCategoryOpen) {
      overrides.layout = overrides.layout || {};
      overrides.layout.defaultCategoryOpen = parseBool(
        script.dataset.defaultCategoryOpen,
        DEFAULT_CONFIG.layout.defaultCategoryOpen
      );
    }
    if (script.dataset.species) {
      overrides.species = parseJSON(script.dataset.species, DEFAULT_CONFIG.species);
    }
    if (script.dataset.reasons) {
      overrides.reasons = parseJSON(script.dataset.reasons, DEFAULT_CONFIG.reasons);
    }
    if (script.dataset.copy) {
      overrides.copy = mergeDeep(overrides.copy || {}, parseJSON(script.dataset.copy, {}));
    }
    if (script.dataset.bookingBaseUrl) {
      overrides.bookingBaseUrl = script.dataset.bookingBaseUrl;
    }
    if (script.dataset.bookingUrl) {
      overrides.bookingUrl = script.dataset.bookingUrl;
    }

    return overrides;
  }

  function prepareConfig(script) {
    const overrides = parseDataConfig(script);
    const language = overrides.language || DEFAULT_CONFIG.language;
    const baseConfig = mergeDeep(DEFAULT_CONFIG, { language });
    const merged = mergeDeep(baseConfig, overrides);

    const preset = COPY_PRESETS[language] || COPY_PRESETS.en;
    merged.copy = mergeDeep(preset, merged.copy || {});
    merged.copy.showAllLabel = normalizeFormatter(merged.copy.showAllLabel, preset.showAllLabel);
    merged.copy.reasonsSubtitle = normalizeFormatter(
      merged.copy.reasonsSubtitle,
      preset.reasonsSubtitle
    );

    if (merged.bookingBaseUrl) {
      merged.reasons = (merged.reasons || []).map((reason) => ({
        ...reason,
        bookingUrl: reason.bookingUrl || `${merged.bookingBaseUrl}${reason.id}`,
      }));
    }

    if (overrides.bookingUrl) {
      merged.bookingUrl = overrides.bookingUrl;
    }

    return merged;
  }

  function initWidget(script) {
    const config = prepareConfig(script);
    const host = document.createElement("div");
    host.className = "provet-booking-host";
    script.insertAdjacentElement("afterend", host);

    const shadowRoot = host.attachShadow({ mode: "open" });
    // eslint-disable-next-line no-new
    new BookingWidget(host, shadowRoot, config);
  }

  const currentScript = document.currentScript;
  if (!currentScript) {
    return;
  }

  const start = () => {
    try {
      initWidget(currentScript);
    } catch (error) {
      console.error("[ProvetWidget] Failed to initialise widget:", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();


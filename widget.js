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
      stepOneTitle: { line1: "Select", line2: "species" },
      stepTwoLabel: "Step 2",
      stepTwoTitle: { line1: "Select", line2: "reason" },
      stepThreeLabel: "Step 3",
      stepThreeTitle: { line1: "Confirm", line2: "on Provet.com" },
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
      stepOneTitle: { line1: "Valitse", line2: "eläinlaji" },
      stepTwoLabel: "Vaihe 2",
      stepTwoTitle: { line1: "Valitse", line2: "tulosyy" },
      stepThreeLabel: "Vaihe 3",
      stepThreeTitle: { line1: "Vahvista", line2: "Provet.comissa" },
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
      stepOneTitle: { line1: "Välj", line2: "djurslag" },
      stepTwoLabel: "Steg 2",
      stepTwoTitle: { line1: "Välj", line2: "besöksorsak" },
      stepThreeLabel: "Steg 3",
      stepThreeTitle: { line1: "Bekräfta", line2: "på Provet.com" },
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
        title: "Consultation",
        duration: "20 min",
        price: "45 €",
        category: "Consultation",
        treatment: "76",
        openInNewTab: true,
      },
      {
        id: "consultation-40",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Consultation",
        duration: "40 min",
        price: "82 €",
        category: "Consultation",
        treatment: "77",
        openInNewTab: true,
      },
      {
        id: "consultation-60",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Consultation",
        duration: "60 min",
        price: "115 €",
        category: "Consultation",
        treatment: "78",
        openInNewTab: true,
      },
      {
        id: "ear-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Ear investigation with sedation",
        duration: "40 min",
        price: "95 €",
        category: "Diagnostics",
        treatment: "68",
        openInNewTab: true,
      },
      {
        id: "eye-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Eye investigation",
        duration: "40 min",
        price: "88 €",
        category: "Diagnostics",
        treatment: "69",
        openInNewTab: true,
      },
      {
        id: "itching-investigation",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Itching investigation",
        duration: "40 min",
        price: "92 €",
        category: "Diagnostics",
        treatment: "66",
        openInNewTab: true,
      },
      {
        id: "health-check-60",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Health check",
        duration: "60 min",
        price: "105 €",
        category: "Health check",
        treatment: "89",
        openInNewTab: true,
      },
      {
        id: "recovery-checkup",
        species: ["dog", "cat", "rabbit", "other"],
        title: "Recovery check-up",
        duration: "40 min",
        price: "68 €",
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
      this.stepIndicator = this.renderStepIndicator();
      this.wrapper.appendChild(this.stepIndicator);
      this.speciesSection = this.renderSpeciesSection();
      this.wrapper.appendChild(this.speciesSection);
      this.reasonsSection = this.renderReasonsSection();
      this.wrapper.appendChild(this.reasonsSection);
      
      const footer = this.el("div", { class: "booking-widget__footer", text: this.config.copy.poweredBy });
      this.wrapper.appendChild(footer);
      
      this.renderSpeciesCards();
      this.renderReasons();
      this.updateStepIndicator();
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

    renderStepIndicator() {
      const container = this.el("div", { class: "step-indicator" });
      
      const step1 = this.el("div", { class: "step-indicator__step", dataset: { step: "species" } });
      const step1Number = this.el("div", { class: "step-indicator__number", text: "1" });
      const step1Label = this.el("div", { class: "step-indicator__label" });
      const step1Line1 = this.el("div", { class: "step-indicator__label-line", text: this.config.copy.stepOneTitle.line1 });
      const step1Line2 = this.el("div", { class: "step-indicator__label-line step-indicator__label-line--bold", text: this.config.copy.stepOneTitle.line2 });
      step1Label.append(step1Line1, step1Line2);
      step1.append(step1Number, step1Label);
      
      step1.addEventListener("click", () => {
        if (this.state.selectedSpeciesId) {
          this.state.currentStep = "species";
          this.syncStepVisibility();
          this.updateStepIndicator();
        }
      });
      
      const divider1 = this.el("div", { class: "step-indicator__divider" });
      
      const step2 = this.el("div", { class: "step-indicator__step", dataset: { step: "reasons" } });
      const step2Number = this.el("div", { class: "step-indicator__number", text: "2" });
      const step2Label = this.el("div", { class: "step-indicator__label" });
      const step2Line1 = this.el("div", { class: "step-indicator__label-line", text: this.config.copy.stepTwoTitle.line1 });
      const step2Line2 = this.el("div", { class: "step-indicator__label-line step-indicator__label-line--bold", text: this.config.copy.stepTwoTitle.line2 });
      step2Label.append(step2Line1, step2Line2);
      step2.append(step2Number, step2Label);
      
      step2.addEventListener("click", () => {
        if (this.state.selectedSpeciesId && this.state.currentStep === "confirm") {
          this.state.currentStep = "reasons";
          this.syncStepVisibility();
          this.updateStepIndicator();
        }
      });
      
      const divider2 = this.el("div", { class: "step-indicator__divider" });
      
      const step3 = this.el("div", { class: "step-indicator__step", dataset: { step: "confirm" } });
      const step3Number = this.el("div", { class: "step-indicator__number", text: "3" });
      const step3Label = this.el("div", { class: "step-indicator__label" });
      const step3Line1 = this.el("div", { class: "step-indicator__label-line", text: this.config.copy.stepThreeTitle.line1 });
      const step3Line2 = this.el("div", { class: "step-indicator__label-line step-indicator__label-line--bold", text: this.config.copy.stepThreeTitle.line2 });
      step3Label.append(step3Line1, step3Line2);
      step3.append(step3Number, step3Label);
      
      container.append(step1, divider1, step2, divider2, step3);
      return container;
    }

    updateStepIndicator() {
      if (!this.stepIndicator) return;
      
      const steps = this.stepIndicator.querySelectorAll(".step-indicator__step");
      steps.forEach((step) => {
        const stepType = step.dataset.step;
        const isActive = this.state.currentStep === stepType;
        
        // Determine if step is completed
        let isCompleted = false;
        if (stepType === "species" && this.state.selectedSpeciesId && (this.state.currentStep === "reasons" || this.state.currentStep === "confirm")) {
          isCompleted = true;
        }
        if (stepType === "reasons" && this.state.currentStep === "confirm") {
          isCompleted = true;
        }
        
        // Determine if step is clickable
        let isClickable = false;
        if (stepType === "species" && this.state.selectedSpeciesId) {
          isClickable = true;
        }
        if (stepType === "reasons" && this.state.selectedSpeciesId && this.state.currentStep === "confirm") {
          isClickable = true;
        }
        
        step.classList.toggle("is-active", isActive);
        step.classList.toggle("is-completed", isCompleted);
        step.classList.toggle("is-clickable", isClickable);
      });
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

      this.reasonsContainer = this.el("div", { class: "reasons-section__categories" });

      section.appendChild(this.reasonsContainer);

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
        this.updateStepIndicator();
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
      
      const metaRow = this.el("div", { class: "reason-card__meta" });
      
      const duration = this.el("span", { class: "reason-card__duration" });
      duration.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 6px;"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>${reason.duration}`;
      metaRow.appendChild(duration);
      
      if (reason.price) {
        const price = this.el("span", { class: "reason-card__price", text: reason.price });
        metaRow.appendChild(price);
      }
      
      info.append(name, metaRow);
      
      const actionButton = this.el("button", {
        class: "reason-card__action",
        text: this.config.copy.reasonActionLabel,
        attrs: { type: "button" },
      });

      const handleNavigate = () => {
        const bookingUrl = reason.bookingUrl || this.config.bookingUrl;
        
        // Update step indicator to step 3
        this.state.currentStep = "confirm";
        this.updateStepIndicator();
        
        dispatchHostEvent(this.host, "reason-selected", {
          speciesId: this.state.selectedSpeciesId,
          reasonId: reason.id,
          bookingUrl,
        });
        
        // Small delay to show step 3 before navigating
        setTimeout(() => {
          this.navigateToBooking(reason);
        }, 300);
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

      .step-indicator {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px 28px;
        background: rgba(16, 24, 64, 0.02);
        border-radius: 16px;
        border: 1px solid rgba(16, 24, 64, 0.08);
      }

      .step-indicator__step {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        opacity: 0.4;
        transition: opacity 200ms ease;
      }

      .step-indicator__step.is-active {
        opacity: 1;
      }

      .step-indicator__step.is-completed {
        opacity: 0.7;
      }

      .step-indicator__step.is-clickable {
        cursor: pointer;
      }

      .step-indicator__step.is-clickable:hover {
        opacity: 0.9;
      }

      .step-indicator__number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(16, 24, 64, 0.08);
        color: var(--provet-text-secondary);
        font-size: 15px;
        font-weight: 600;
        flex-shrink: 0;
      }

      .step-indicator__step.is-active .step-indicator__number {
        background: var(--provet-primary);
        color: var(--provet-primary-contrast);
      }

      .step-indicator__step.is-completed .step-indicator__number {
        background: rgba(64, 17, 150, 0.15);
        color: var(--provet-primary);
      }

      .step-indicator__label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        line-height: 1.2;
      }

      .step-indicator__label-line {
        font-size: 14px;
        font-weight: 400;
        color: var(--provet-text-primary);
      }

      .step-indicator__label-line--bold {
        font-weight: 700;
      }

      .step-indicator__divider {
        width: 40px;
        height: 2px;
        background: rgba(16, 24, 64, 0.1);
        flex-shrink: 0;
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
        border-radius: 16px;
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
        border-radius: 16px;
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
        gap: 12px;
      }

      .reason-card__name {
        font-size: 17px;
        font-weight: 600;
        color: var(--provet-text-primary);
      }

      .reason-card__meta {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .reason-card__duration {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        font-size: 14px;
        font-weight: 600;
        color: var(--provet-text-primary);
        padding: 6px 12px;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid rgba(16, 24, 64, 0.15);
      }

      .reason-card__price {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        font-size: 14px;
        font-weight: 600;
        color: var(--provet-text-primary);
        padding: 6px 12px;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid rgba(16, 24, 64, 0.15);
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

        .step-indicator {
          padding: 18px 20px;
          gap: 12px;
        }

        .step-indicator__step {
          gap: 8px;
        }

        .step-indicator__number {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }

        .step-indicator__label-line {
          font-size: 13px;
        }

        .step-indicator__divider {
          width: 24px;
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


/**
 * PROBLEM-SOLUTION STATEMENT GUIDE — SCRIPT
 * Interactive functionality, heuristics analyzer, statement generator, and checklist
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message, type = 'success', icon = 'fa-circle-check') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : 
                    type === 'warning' ? 'bg-warning text-dark' : 
                    type === 'danger' ? 'bg-danger text-white' : 'bg-primary text-white';

    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    if (window.bootstrap && bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastElement, { delay: 3500 });
      bsToast.show();
      toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
      });
    }
  }

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & AUTO-COLLAPSE
     ========================================================================== */
  const navbar = document.getElementById('mainNavbar');
  const navCollapse = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Auto close mobile navbar when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200 && navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id], header[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.navbar-nav a').forEach(a => a.classList.remove('active'));
        if (navItem) navItem.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     3. HERO PATHWAY INTERACTION
     ========================================================================== */
  const pathwayNodes = document.querySelectorAll('.pathway-node');
  const heroInsight = document.getElementById('hero-node-insight');

  const stageInsights = {
    problem: 'Stage 01 — Problem: Focus on the observed breakdown, not who to blame.',
    analysis: 'Stage 02 — Analysis: Drill down with the 5 Whys to pinpoint root cause.',
    solution: 'Stage 03 — Solution: Frame interventions neutrally to allow exploration.',
    outcome: 'Stage 04 — Outcome: Anchor success in quantifiable, verifiable KPIs.'
  };

  pathwayNodes.forEach(node => {
    node.addEventListener('click', () => {
      pathwayNodes.forEach(n => n.classList.remove('active-node'));
      node.classList.add('active-node');
      const stage = node.getAttribute('data-stage');
      if (heroInsight && stageInsights[stage]) {
        heroInsight.textContent = stageInsights[stage];
        heroInsight.className = `badge bg-light text-primary border px-2 py-1 small animate__animated animate__fadeIn`;
      }
    });
  });

  /* ==========================================================================
     4. SOLUTION-NEUTRAL TOGGLE (ASSUMPTION VS EVIDENCE)
     ========================================================================== */
  const btnShowComparison = document.getElementById('btn-show-comparison');
  const btnToggleAssumption = document.getElementById('btn-toggle-assumption');
  const btnToggleEvidence = document.getElementById('btn-toggle-evidence');
  const btnShowExamples = document.getElementById('btn-show-neutral-examples');
  const comparisonView = document.getElementById('comparison-view');
  const industryView = document.getElementById('industry-examples-view');
  const assumingCard = document.querySelector('.solution-assuming-card')?.closest('.col-lg-6');
  const neutralCard = document.querySelector('.solution-neutral-card')?.closest('.col-lg-6');

  function resetToggleButtons() {
    [btnShowComparison, btnToggleAssumption, btnToggleEvidence, btnShowExamples].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
  }

  btnShowComparison?.addEventListener('click', () => {
    resetToggleButtons();
    btnShowComparison.classList.add('active');
    comparisonView.classList.remove('d-none');
    industryView.classList.add('d-none');
    if (assumingCard) { assumingCard.classList.remove('d-none'); assumingCard.style.opacity = '1'; }
    if (neutralCard) { neutralCard.classList.remove('d-none'); neutralCard.style.opacity = '1'; }
    showToast('Displaying side-by-side comparison', 'info', 'fa-code-compare');
  });

  btnToggleAssumption?.addEventListener('click', () => {
    resetToggleButtons();
    btnToggleAssumption.classList.add('active');
    comparisonView.classList.remove('d-none');
    industryView.classList.add('d-none');
    if (assumingCard) { assumingCard.classList.remove('d-none'); assumingCard.style.opacity = '1'; }
    if (neutralCard) { neutralCard.classList.add('d-none'); }
    showToast('Assumption Lens: Highlights biased, solution-assuming traps.', 'warning', 'fa-triangle-exclamation');
  });

  btnToggleEvidence?.addEventListener('click', () => {
    resetToggleButtons();
    btnToggleEvidence.classList.add('active');
    comparisonView.classList.remove('d-none');
    industryView.classList.add('d-none');
    if (assumingCard) { assumingCard.classList.add('d-none'); }
    if (neutralCard) { neutralCard.classList.remove('d-none'); neutralCard.style.opacity = '1'; }
    showToast('Evidence Lens: Highlights objective, solution-neutral framing.', 'success', 'fa-circle-check');
  });

  btnShowExamples?.addEventListener('click', () => {
    resetToggleButtons();
    btnShowExamples.classList.add('active');
    comparisonView.classList.add('d-none');
    industryView.classList.remove('d-none');
    showToast('Viewing industry examples across Healthcare, EdTech, Logistics', 'info', 'fa-layer-group');
  });

  /* ==========================================================================
     5. FORMULA BLOCKS INTERACTIVE SYNC (BIDIRECTIONAL)
     ========================================================================== */
  const formulaBlocks = document.querySelectorAll('.formula-block-card');
  const formulaHighlights = document.querySelectorAll('.formula-var-highlight');

  function activateFormulaItem(targetId) {
    formulaBlocks.forEach(b => {
      if (b.getAttribute('data-target') === targetId) {
        b.classList.add('active-block');
        b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        b.classList.remove('active-block');
      }
    });

    formulaHighlights.forEach(hl => {
      if (hl.id === targetId) {
        hl.style.transform = 'scale(1.08)';
        hl.style.boxShadow = '0 0 18px rgba(255,255,255,0.7)';
      } else {
        hl.style.transform = 'scale(1)';
        hl.style.boxShadow = 'none';
      }
    });

    setTimeout(() => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.style.transform = 'scale(1)';
        targetEl.style.boxShadow = 'none';
      }
    }, 1500);
  }

  formulaBlocks.forEach(block => {
    block.addEventListener('click', () => {
      const targetId = block.getAttribute('data-target');
      activateFormulaItem(targetId);
    });
  });

  // Make quote placeholders directly clickable too!
  formulaHighlights.forEach(hl => {
    hl.addEventListener('click', () => {
      activateFormulaItem(hl.id);
      showToast(`Formula Variable: ${hl.textContent}`, 'info', 'fa-square-root-variable');
    });
  });

  /* ==========================================================================
     6. INTERACTIVE STATEMENT BUILDER
     ========================================================================== */
  const statementForm = document.getElementById('statementForm');
  const statementResultBox = document.getElementById('statementResultBox');
  const btnCopyStatement = document.getElementById('btn-copy-statement');
  const btnEditStatement = document.getElementById('btn-edit-statement');
  const btnDownloadTxt = document.getElementById('btn-download-txt');
  const btnClearBuilder = document.getElementById('btn-clear-builder');
  const copyAlertMessage = document.getElementById('copyAlertMessage');

  // View mode buttons
  const btnViewStandard = document.getElementById('btn-view-standard');
  const btnViewFormula = document.getElementById('btn-view-formula');
  const btnViewBulleted = document.getElementById('btn-view-bulleted');

  let currentViewMode = 'standard';
  let generatedData = null;

  // Preset Data Templates
  const presets = {
    clinic: {
      problem: "Patients experience excessive in-clinic waiting times averaging 45 minutes",
      stakeholders: "outpatients, accompanying family members, and clinic nursing staff",
      impact: "a 22% appointment abandonment rate and lower patient satisfaction (CSAT 48%)",
      rootCause: "paper-based walk-in intake and doctor triage scheduling mismatches",
      improvement: "reduce average wait time from 45 minutes to under 15 minutes",
      solution: "staggered digital pre-checkin kiosks and real-time triage queue display",
      success: "90% patient CSAT score and near-zero unscheduled wait dropouts"
    },
    student: {
      problem: "35% of first-year computer science students fail or drop introductory programming",
      stakeholders: "enrolled undergraduates, course teaching assistants, and department faculty",
      impact: "an estimated $140,000 lost semester tuition and depressed STEM retention rates",
      rootCause: "lack of early diagnostic feedback during the first 3 weeks of code syntax",
      improvement: "lower course drop-off rate from 35% down to under 12%",
      solution: "scaffolded automated syntax feedback checkers and peer-led lab sprints",
      success: "88% course completion rate and a 20% bump in follow-on course enrollment"
    },
    saas: {
      problem: "62% of trial users abandon onboarding without completing workspace configuration",
      stakeholders: "newly registered trial users and the customer success growth team",
      impact: "wasted customer acquisition cost ($85/user) and depressed conversion to paid tiers",
      rootCause: "compulsory 14-field setup wizard before users experience core product value",
      improvement: "lift trial completion rate from 38% to 75% within 60 days",
      solution: "progressive profiling with one-click interactive sandbox starter templates",
      success: "2.4x increase in paid conversions and 60% reduction in day-1 dropoff"
    }
  };

  // Preset button listeners
  document.getElementById('preset-clinic')?.addEventListener('click', () => loadPreset('clinic'));
  document.getElementById('preset-student')?.addEventListener('click', () => loadPreset('student'));
  document.getElementById('preset-saas')?.addEventListener('click', () => loadPreset('saas'));

  function loadPreset(key) {
    const data = presets[key];
    if (!data) return;

    document.getElementById('inputProblem').value = data.problem;
    document.getElementById('inputStakeholders').value = data.stakeholders;
    document.getElementById('inputImpact').value = data.impact;
    document.getElementById('inputRootCause').value = data.rootCause;
    document.getElementById('inputImprovement').value = data.improvement;
    document.getElementById('inputSolution').value = data.solution;
    document.getElementById('inputSuccess').value = data.success;

    generateAndRenderStatement();
    showToast(`Loaded ${key.toUpperCase()} Preset!`, 'info', 'fa-bolt');
  }

  // Clear Form
  btnClearBuilder?.addEventListener('click', () => {
    statementForm.reset();
    generatedData = null;
    btnCopyStatement.disabled = true;
    btnEditStatement.disabled = true;
    btnDownloadTxt.disabled = true;
    copyAlertMessage.classList.add('d-none');

    statementResultBox.innerHTML = `
      <div class="empty-state text-center py-5 text-muted">
        <div class="empty-icon mb-3 text-secondary">
          <i class="fa-solid fa-feather-pointed fa-3x"></i>
        </div>
        <h6 class="fw-bold">Your Statement Will Appear Here</h6>
        <p class="small mb-3">Fill out the form on the left or click one of the quick presets to immediately see a synthesized statement.</p>
        <button type="button" class="btn btn-outline-primary btn-sm rounded-pill" onclick="document.getElementById('preset-clinic').click()">
          <i class="fa-solid fa-wand-magic-sparkles me-1"></i> Try Clinic Preset
        </button>
      </div>
    `;
    showToast('Form cleared.', 'warning', 'fa-rotate-left');
  });

  // Handle Form Submit
  statementForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const problem = document.getElementById('inputProblem').value.trim();
    const stakeholders = document.getElementById('inputStakeholders').value.trim();
    const impact = document.getElementById('inputImpact').value.trim();
    const rootCause = document.getElementById('inputRootCause').value.trim();
    const improvement = document.getElementById('inputImprovement').value.trim();
    const solution = document.getElementById('inputSolution').value.trim();
    const success = document.getElementById('inputSuccess').value.trim();

    if (!problem || !stakeholders || !impact || !rootCause || !improvement || !solution || !success) {
      showToast('Please fill in all 7 required fields to generate a statement.', 'danger', 'fa-triangle-exclamation');
      return;
    }

    generatedData = { problem, stakeholders, impact, rootCause, improvement, solution, success };
    renderGeneratedStatement();
    
    btnCopyStatement.disabled = false;
    btnEditStatement.disabled = false;
    btnDownloadTxt.disabled = false;

    showToast('Statement generated successfully!', 'success', 'fa-wand-magic-sparkles');
  });

  function generateAndRenderStatement() {
    const problem = document.getElementById('inputProblem').value.trim();
    const stakeholders = document.getElementById('inputStakeholders').value.trim();
    const impact = document.getElementById('inputImpact').value.trim();
    const rootCause = document.getElementById('inputRootCause').value.trim();
    const improvement = document.getElementById('inputImprovement').value.trim();
    const solution = document.getElementById('inputSolution').value.trim();
    const success = document.getElementById('inputSuccess').value.trim();

    generatedData = { problem, stakeholders, impact, rootCause, improvement, solution, success };
    renderGeneratedStatement();

    btnCopyStatement.disabled = false;
    btnEditStatement.disabled = false;
    btnDownloadTxt.disabled = false;
  }

  // Render view modes
  function renderGeneratedStatement() {
    if (!generatedData) return;
    const { problem, stakeholders, impact, rootCause, improvement, solution, success } = generatedData;

    let contentHTML = '';

    if (currentViewMode === 'standard') {
      contentHTML = `
        <div class="generated-statement-card">
          <div class="badge bg-primary-subtle text-primary border mb-3">Executive Summary Format</div>
          <p class="generated-statement-text mb-3">
            “The problem of <span class="statement-tag-highlight tag-problem">${escapeHtml(problem)}</span>
            affects <span class="statement-tag-highlight tag-stakeholders">${escapeHtml(stakeholders)}</span>,
            resulting in <span class="statement-tag-highlight tag-impact">${escapeHtml(impact)}</span>.
            This friction is primarily caused by <strong class="text-info">${escapeHtml(rootCause)}</strong>.
            By implementing <span class="statement-tag-highlight tag-solution">${escapeHtml(solution)}</span>,
            we will <span class="statement-tag-highlight tag-outcome">${escapeHtml(improvement)}</span>,
            achieving <strong class="text-success">${escapeHtml(success)}</strong>.”
          </p>
          <div class="small text-muted mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
            <span><i class="fa-solid fa-check-double text-success me-1"></i> Synthesized with 7-dimension rigor</span>
            <span class="badge bg-light text-dark border">Ready for Proposal</span>
          </div>
        </div>
      `;
    } else if (currentViewMode === 'formula') {
      contentHTML = `
        <div class="generated-statement-card">
          <div class="badge bg-indigo-subtle text-indigo border mb-3">Formula Blueprint Format</div>
          <div class="p-3 bg-white rounded-3 border mb-3 font-monospace small">
            <div><strong class="text-danger">[Issue]:</strong> ${escapeHtml(problem)}</div>
            <div class="mt-2"><strong class="text-warning">[Stakeholders]:</strong> ${escapeHtml(stakeholders)}</div>
            <div class="mt-2"><strong class="text-danger">[Impact]:</strong> ${escapeHtml(impact)}</div>
            <div class="mt-2"><strong class="text-info">[Root Cause]:</strong> ${escapeHtml(rootCause)}</div>
            <div class="mt-2"><strong class="text-primary">[Intervention]:</strong> ${escapeHtml(solution)}</div>
            <div class="mt-2"><strong class="text-success">[Target Outcome]:</strong> ${escapeHtml(improvement)} (${escapeHtml(success)})</div>
          </div>
        </div>
      `;
    } else if (currentViewMode === 'bulleted') {
      contentHTML = `
        <div class="generated-statement-card">
          <div class="badge bg-warning-subtle text-warning border mb-3">Pitch Deck / Hackathon Format</div>
          <ul class="list-unstyled mb-0">
            <li class="p-2 mb-2 bg-white rounded border">
              <strong class="text-danger"><i class="fa-solid fa-triangle-exclamation me-1"></i> Problem & Pain:</strong> 
              ${escapeHtml(problem)} affecting ${escapeHtml(stakeholders)}, causing ${escapeHtml(impact)}.
            </li>
            <li class="p-2 mb-2 bg-white rounded border">
              <strong class="text-info"><i class="fa-solid fa-magnifying-glass me-1"></i> Root Cause:</strong> 
              ${escapeHtml(rootCause)}.
            </li>
            <li class="p-2 mb-2 bg-white rounded border">
              <strong class="text-primary"><i class="fa-solid fa-lightbulb me-1"></i> Solution:</strong> 
              ${escapeHtml(solution)}.
            </li>
            <li class="p-2 bg-white rounded border">
              <strong class="text-success"><i class="fa-solid fa-bullseye me-1"></i> Target Outcome:</strong> 
              ${escapeHtml(improvement)} to deliver ${escapeHtml(success)}.
            </li>
          </ul>
        </div>
      `;
    }

    statementResultBox.innerHTML = contentHTML;
  }

  // View switchers
  btnViewStandard?.addEventListener('click', () => {
    currentViewMode = 'standard';
    setActiveViewBtn(btnViewStandard);
    renderGeneratedStatement();
  });
  btnViewFormula?.addEventListener('click', () => {
    currentViewMode = 'formula';
    setActiveViewBtn(btnViewFormula);
    renderGeneratedStatement();
  });
  btnViewBulleted?.addEventListener('click', () => {
    currentViewMode = 'bulleted';
    setActiveViewBtn(btnViewBulleted);
    renderGeneratedStatement();
  });

  function setActiveViewBtn(activeBtn) {
    [btnViewStandard, btnViewFormula, btnViewBulleted].forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  // Copy to Clipboard
  btnCopyStatement?.addEventListener('click', () => {
    if (!generatedData) return;
    const textToCopy = getPlainStatementText();
    const originalText = btnCopyStatement.innerHTML;

    function applyCopyFeedback() {
      btnCopyStatement.innerHTML = '<i class="fa-solid fa-check me-1"></i> Copied successfully!';
      btnCopyStatement.classList.remove('btn-primary');
      btnCopyStatement.classList.add('btn-success');
      copyAlertMessage.classList.remove('d-none');
      showToast('Copied successfully to clipboard!', 'success', 'fa-copy');

      setTimeout(() => {
        btnCopyStatement.innerHTML = originalText;
        btnCopyStatement.classList.remove('btn-success');
        btnCopyStatement.classList.add('btn-primary');
        copyAlertMessage.classList.add('d-none');
      }, 2500);
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      applyCopyFeedback();
    }).catch(() => {
      fallbackCopyText(textToCopy);
      applyCopyFeedback();
    });
  });

  // Edit statement: smooth scroll back to form & focus
  btnEditStatement?.addEventListener('click', () => {
    document.getElementById('inputProblem')?.focus();
    document.getElementById('statementForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Download Statement as TXT
  btnDownloadTxt?.addEventListener('click', () => {
    if (!generatedData) return;
    const text = `PROBLEM-SOLUTION STATEMENT\nGenerated via Problem-Solution Statement Guide\n\n${getPlainStatementText()}\n\n---\nFramework: Problem -> Evidence -> Impact -> Cause -> Goal -> Solution -> Outcome`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `problem-solution-statement-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded statement text file.', 'info', 'fa-download');
  });

  function getPlainStatementText() {
    if (!generatedData) return '';
    const { problem, stakeholders, impact, rootCause, improvement, solution, success } = generatedData;
    if (currentViewMode === 'bulleted') {
      return `• Problem & Stakeholders: ${problem} affecting ${stakeholders}, resulting in ${impact}.\n• Root Cause: ${rootCause}\n• Solution Approach: ${solution}\n• Target Outcome: ${improvement}, achieving ${success}.`;
    }
    return `The problem of ${problem} affects ${stakeholders}, resulting in ${impact}. This is primarily caused by ${rootCause}. By implementing ${solution}, we can ${improvement}, achieving ${success}.`;
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    copyAlertMessage.classList.remove('d-none');
    showToast('Copied statement to clipboard!', 'success', 'fa-copy');
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ==========================================================================
     7. STATEMENT QUALITY CHECKER (CLIENT-SIDE HEURISTICS)
     ========================================================================== */
  const customStatementInput = document.getElementById('customStatementInput');
  const btnAnalyzeStatement = document.getElementById('btn-analyze-statement');
  const qualityScoreBadge = document.getElementById('qualityScoreBadge');
  const qualityProgressBar = document.getElementById('qualityProgressBar');
  const analysisFeedback = document.getElementById('analysisFeedback');

  const btnTestWeak = document.getElementById('btn-test-weak');
  const btnTestStrong = document.getElementById('btn-test-strong');

  const weakExample = "Our clinic is bad and slow because we don't have a modern smartphone mobile app for our patients.";
  const strongExample = "Outpatients visiting downtown branch experience average wait times of 42 minutes, causing a 24% appointment cancellation rate and $35k in wasted clinician hours due to manual paper registration and mismatched peak staffing. By implementing digital triage kiosks and staggered shift allocations, we will reduce wait times to under 12 minutes and achieve 90% patient CSAT.";

  btnTestWeak?.addEventListener('click', () => {
    customStatementInput.value = weakExample;
    analyzeStatementText(weakExample);
  });

  btnTestStrong?.addEventListener('click', () => {
    customStatementInput.value = strongExample;
    analyzeStatementText(strongExample);
  });

  btnAnalyzeStatement?.addEventListener('click', () => {
    const text = customStatementInput.value.trim();
    if (!text) {
      showToast('Please type or paste a statement to analyze.', 'warning', 'fa-pencil');
      return;
    }
    analyzeStatementText(text);
  });

  function analyzeStatementText(text) {
    const lower = text.toLowerCase();
    
    // Heuristic Rules
    const hasProblem = lower.length > 25 && /(problem|delay|wait|error|drop|churn|fail|issue|defect|inefficien|slow|friction|struggle|abandon|bottleneck)/i.test(lower);
    
    const hasStakeholders = /(customer|user|patient|employee|staff|student|team|client|people|visitor|manager|community|cohort|worker)/i.test(lower);
    
    const hasImpact = /(impact|cost|waste|loss|rate|churn|complaint|lost|frustrat|damag|suffer|drop-off|cancellation|\$|hour)/i.test(lower);
    
    const hasRootCause = /(because|cause|due to|driver|driven|reason|manual|mismatch|bottleneck|lack of process|outdated|unaligned)/i.test(lower);
    
    const hasObjective = /(\d+|%|minute|min|sec|hour|day|week|month|baseline|reduce|increase|from .* to|under|target)/i.test(lower);
    
    const hasOutcome = /(outcome|success|achiev|csat|satisfaction|nps|deliver|target|goal|retention|zero)/i.test(lower);

    // Solution Neutrality: Detect anti-patterns (premature assumption of tools)
    const biasedPatterns = [
      /because (we (don't|do not) have|there is no|the office has no) (an? )?(app|software|system|tool|platform|digital)/i,
      /needs (an? )?(app|software|portal|tool|website) to fix/i,
      /is bad because (we lack|there isn't)/i
    ];
    let isBiased = false;
    for (let pattern of biasedPatterns) {
      if (pattern.test(lower)) {
        isBiased = true;
        break;
      }
    }
    const isNeutral = !isBiased;

    // Update Checklist UI
    updateCheckItem('check-problem', hasProblem);
    updateCheckItem('check-stakeholders', hasStakeholders);
    updateCheckItem('check-impact', hasImpact);
    updateCheckItem('check-rootcause', hasRootCause);
    updateCheckItem('check-objective', hasObjective);
    updateCheckItem('check-outcome', hasOutcome);
    updateCheckItem('check-neutrality', isNeutral);

    // Calculate Score (weights)
    let score = 0;
    if (hasProblem) score += 15;
    if (hasStakeholders) score += 15;
    if (hasImpact) score += 15;
    if (hasRootCause) score += 15;
    if (hasObjective) score += 15;
    if (hasOutcome) score += 15;
    if (isNeutral) score += 10;

    // Score display
    qualityProgressBar.style.width = `${score}%`;
    qualityProgressBar.setAttribute('aria-valuenow', score);

    if (score >= 80) {
      qualityProgressBar.className = 'progress-bar bg-success';
      qualityScoreBadge.className = 'badge bg-success px-3 py-2 rounded-pill fs-6';
      qualityScoreBadge.textContent = `${score}% — Strong & Actionable!`;
    } else if (score >= 50) {
      qualityProgressBar.className = 'progress-bar bg-warning';
      qualityScoreBadge.className = 'badge bg-warning text-dark px-3 py-2 rounded-pill fs-6';
      qualityScoreBadge.textContent = `${score}% — Moderate (Needs Polish)`;
    } else {
      qualityProgressBar.className = 'progress-bar bg-danger';
      qualityScoreBadge.className = 'badge bg-danger px-3 py-2 rounded-pill fs-6';
      qualityScoreBadge.textContent = `${score}% — Needs Significant Work`;
    }

    // Feedback recommendations
    const tips = [];
    if (!hasProblem) tips.push("Specify the exact breakdown or observable friction rather than vague statements.");
    if (!hasStakeholders) tips.push("Name the specific people affected (e.g., customers, frontline staff, students).");
    if (!hasImpact) tips.push("Quantify the pain in hours, dollars, or percentage losses.");
    if (!hasRootCause) tips.push("State the systemic cause (use the 5 Whys), not just the symptom.");
    if (!hasObjective) tips.push("Include measurable numerical targets (e.g. from 40 min to 10 min).");
    if (!hasOutcome) tips.push("Declare what victory looks like (e.g. 90% CSAT, zero dropouts).");
    if (!isNeutral) tips.push("⚠️ Remove solution bias: Avoid phrasing the problem as the absence of a specific technology (e.g. 'we don't have an app').");

    if (tips.length > 0) {
      analysisFeedback.classList.remove('d-none');
      analysisFeedback.innerHTML = `
        <div class="fw-bold text-dark mb-2"><i class="fa-solid fa-lightbulb text-warning me-1"></i> Recommendations to improve:</div>
        <ul class="mb-0 ps-3">
          ${tips.map(t => `<li class="mb-1">${t}</li>`).join('')}
        </ul>
      `;
    } else {
      analysisFeedback.classList.remove('d-none');
      analysisFeedback.innerHTML = `
        <div class="text-success fw-bold">
          <i class="fa-solid fa-circle-check me-1"></i> Outstanding Problem-Solution Statement!
        </div>
        <div class="text-muted small mt-1">
          Your statement includes all essential components, avoids solution bias, and is backed by measurable metrics.
        </div>
      `;
    }

    showToast(`Analysis Complete: Quality Score ${score}%`, score >= 70 ? 'success' : 'warning', 'fa-magnifying-glass-chart');
  }

  function updateCheckItem(elementId, isValid) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const icon = el.querySelector('i');
    if (isValid) {
      el.className = 'analysis-item valid';
      if (icon) icon.className = 'fa-solid fa-circle-check text-success';
    } else {
      el.className = 'analysis-item invalid';
      if (icon) icon.className = 'fa-solid fa-circle-xmark text-danger';
    }
  }

  /* ==========================================================================
     8. QUICK CHECKLIST (10 CRITERIA & PERCENTAGE COUNTER)
     ========================================================================== */
  const checkBoxes = document.querySelectorAll('.checklist-box');
  const checklistPercentage = document.getElementById('checklistPercentage');
  const checklistProgressBar = document.getElementById('checklistProgressBar');
  const checklistSuccessBanner = document.getElementById('checklistSuccessBanner');
  const btnCheckAll = document.getElementById('btn-check-all');
  const btnResetChecklist = document.getElementById('btn-reset-checklist');

  function updateChecklistProgress() {
    let checkedCount = 0;
    checkBoxes.forEach(box => {
      const parentItem = box.closest('.custom-checkbox-item');
      if (box.checked) {
        checkedCount++;
        parentItem?.classList.add('checked');
      } else {
        parentItem?.classList.remove('checked');
      }
    });

    const percent = Math.round((checkedCount / checkBoxes.length) * 100);
    if (checklistPercentage) checklistPercentage.textContent = `${percent}%`;
    if (checklistProgressBar) {
      checklistProgressBar.style.width = `${percent}%`;
      checklistProgressBar.setAttribute('aria-valuenow', percent);

      if (percent === 100) {
        checklistProgressBar.className = 'progress-bar bg-success';
        checklistSuccessBanner?.classList.remove('d-none');
        showToast('All 10 Verification Criteria Met! Ready to Present!', 'success', 'fa-award');
      } else {
        checklistProgressBar.className = 'progress-bar bg-primary';
        checklistSuccessBanner?.classList.add('d-none');
      }
    }
  }

  checkBoxes.forEach(box => {
    box.addEventListener('change', updateChecklistProgress);
  });

  btnCheckAll?.addEventListener('click', () => {
    checkBoxes.forEach(box => box.checked = true);
    updateChecklistProgress();
  });

  btnResetChecklist?.addEventListener('click', () => {
    checkBoxes.forEach(box => box.checked = false);
    updateChecklistProgress();
    showToast('Checklist reset.', 'info', 'fa-rotate-left');
  });

  // Initial calculation
  updateChecklistProgress();
});

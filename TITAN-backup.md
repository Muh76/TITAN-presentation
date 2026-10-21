---
theme: default
title: 'TITAN: A multimodal whole-slide foundation model for pathology'
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: fade
mdc: false
fonts:
  sans: Arial
  provider: none
  local: Arial
  italic: false
drawings:
  enabled: false
  persist: false
download: false
exportFilename: TITAN-backup
export:
  withClicks: false
defaults:
  layout: default
  class: titan
---


# Questions & discussion

<div class="point"><h2>How much whole-slide context is retained?</h2><p>Regional training makes this a central design question.</p></div><div v-click="1"><div class="point"><h2>What does each language source add?</h2><p>Detailed morphology versus diagnostic terminology.</p></div></div><div v-click="2"><div class="point"><h2>What would establish clinical readiness?</h2><p>Robustness, errors, prospective utility, and measured runtime.</p></div></div><Link class="backup-link" to="2">Open backup material ?</Link>

<div class="source">Ding et al. · Nature Medicine (2025) · 10.1038/s41591-025-03982-3</div><div class="page-number">B01</div>

<!--


Source detail retained from original topic (for presenter reference):
# 15 · Q&A and key technical references




## Technical discussion

- How much whole-slide context survives regional pretraining?
- Why does stage 1 removal have a small zero-shot effect despite strong visual transfer?
- What information is complementary between ROI captions and clinical reports?
- How should molecular results with $P=0.060$ be interpreted?
- Which efficiency measurements are still needed for deployment assessment?




## 🎨 Visual/Data Support

### Selected bibliography from the paper

| Ref. | Citation | Role |
|---|---|---|
| 10 | Lu et al. *A visual-language foundation model for computational pathology*. Nature Medicine 30, 863–874 (2024) | CONCH lineage |
| 62 | Shaikovski et al. *PRISM: a multi-modal generative foundation model for slide-level histopathology*. arXiv:2405.10254 (2024) | Comparator |
| 83 | Wang et al. *A pathology foundation model for cancer diagnosis and prognosis prediction*. Nature 634, 970–978 (2024) | CHIEF |
| 86 | Zhou et al. *iBOT: image BERT pre-training with online tokenizer*. ICLR (2022) | Visual SSL |
| 88 | Lu et al. *A multimodal generative AI copilot for human pathology*. Nature 634, 466–473 (2024) | PathChat |
| 93 | Bär et al. *Frozen feature augmentation for few-shot image classification*. CVPR, 16046–16057 (2024) | Augmentation |
| 94 | Press et al. *Train short, test long: attention with linear biases enables input length extrapolation*. ICLR (2022) | ALiBi |
| 95 | Yu et al. *CoCa: contrastive captioners are image-text foundation models*. TMLR (2022) | Alignment |

Bibliography table is the visual anchor for this slide. Reference numbers match the TITAN paper.
-->

---
layout: default
class: titan backup
---

# Backup · comparison boundaries

<table><thead><tr><th>Model</th><th>Slide mechanism</th><th>Patch encoder</th></tr></thead><tbody><tr><td>Mean</td><td>Average features</td><td>CONCHv1.5</td></tr><tr><td>GigaPath</td><td>LongNet; masked autoencoding</td><td>ViT-G/14; DINOv2</td></tr><tr><td>PRISM</td><td>Perceiver; CoCa report alignment</td><td>Virchow; ViT-H/14</td></tr><tr><td>CHIEF</td><td>Attention; contrastive + site supervision</td><td>CTransPath</td></tr></tbody></table><div class="takeaway">Patch encoders, pretraining data, and magnifications differ.</div><p>TITAN, PRISM, and GigaPath exclude TCGA and PANDA; CHIEF includes them. The evaluated public GigaPath model is unimodal.</p>

<div class="source">Methods: baselines</div><div class="page-number">B02</div>

<!--


Source detail retained from original topic (for presenter reference):
# 2 · Problem statement and baseline limitations




## The authors’ target problem

- Gigapixel WSIs with long, variable patch-feature sequences
- Small disease-specific cohorts, especially for rare conditions
- Reusable slide embeddings for clinical endpoints and retrieval
- Tissue context beyond independent local patch representations

| Baseline | Slide-level mechanism | Patch encoder |
|---|---|---|
| Mean pooling | Average patch features | CONCHv1.5 |
| GigaPath | LongNet; masked autoencoding | ViT-G/14, DINOv2 |
| PRISM | Perceiver; CoCa report alignment | Virchow, ViT-H/14 |
| CHIEF | Attention aggregation; contrastive learning and anatomic site | CTransPath |

## Limitations identified in the paper

- Predominantly visual pretraining omits report supervision
- Limited slide-pretraining scale and SSL recipe optimization
- Some prior multimodal models still require task-specific training
- Limited evaluation of few-shot and diagnostically relevant retrieval




## 🎨 Visual/Data Support



Figure 2e · Learning-paradigm comparison

### Comparison boundaries

- Different patch encoders, data, and magnifications
- CHIEF includes TCGA and PANDA in pretraining
- TITAN, PRISM, GigaPath exclude TCGA and PANDA
- Evaluated GigaPath model is the public unimodal version
-->

---
layout: default
class: titan backup
---

# Backup · architecture and compute

<table><thead><tr><th>Setting</th><th>Stage 1</th><th>Stage 2</th><th>Stage 3</th></tr></thead><tbody><tr><td>Context</td><td>16 × 16 features</td><td>8,192²-pixel ROI</td><td>64 × 64 features</td></tr><tr><td>A100 80 GB GPUs</td><td>4</td><td>8</td><td>8</td></tr><tr><td>Local batch / GPU</td><td>256</td><td>196</td><td>16</td></tr><tr><td>Gradient accumulation</td><td>Not specified</td><td>2</td><td>2</td></tr><tr><td>Effective batch</td><td>Not explicit</td><td>3,136</td><td>256</td></tr><tr><td>Epochs / iterations</td><td>270 / 91,260</td><td>Not provided</td><td>Not provided</td></tr></tbody></table><p>Visual encoder: 6 layers; 12 heads × 64 dimensions; width 768; hidden 3,072. MLP replaces patch embedding. Text encoder and decoder: 12 layers each.</p>

<div class="source">Methods: network architecture; vision-language pretraining</div><div class="page-number">B03</div>

<!--
Learning rates, weight decay, and training schedules: Supplementary Tables 3, 9–10, not supplied. No unverified values are asserted.

Source detail retained from original topic (for presenter reference):
# 8 · Experimental setup, benchmarks, and compute




## Pretraining settings

| Setting | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|
| Context | $16\times16$ features | $8,192^2$-pixel ROI | $64\times64$ features |
| A100 GPUs, 80 GB each | 4 | 8 | 8 |
| Local batch/GPU | 256 | 196 | 16 |
| Gradient accumulation | Not specified | 2 | 2 |
| Effective batch, reported | Not explicit | 3,136 | 256 |
| Epochs / iterations | 270 / 91,260 | Not provided | Not provided |

## Principal benchmark datasets

| Dataset | Scale / labels |
|---|---|
| TCGA-UT-8K | 25,495 ROIs from 9,662 WSIs; 32 classes |
| TCGA-OT | 11,186 WSIs; 46 classes |
| OT108 / EBRAINS | 108 / 30 subtyping classes |
| TCGA-Slide-Reports | 10,108 slide-report pairs |
| Rare-Cancer | 19,626 WSIs; 43 rare + 143 common types |
| Rare-Cancer-Public | 14,062 WSIs; 29 rare + 98 common types |
| Rare-Cancer-External | 39 WSIs; 12 rare ovarian/soft-tissue types |

Exact learning rates, weight decay, and stage 2–3 durations: Supplementary Tables 3, 9–10. [Source limitation: detail not established in supplied PDF; do not infer.]




## 🎨 Visual/Data Support



Figure 1a · Mass-340K distribution

### Evaluation protocol

- TCGA: label-stratified, site-preserving splits
- External cohorts: CPTAC, DHMC, EBRAINS where available
- Linear probe: L-BFGS; 45 regularization values, $10^{-6}$–$10^5$
- Few-shot: 50 sampled runs
- Uncertainty: five folds or 1,000 bootstraps
- Downstream: one RTX 3090, 24 GB
- Python 3.9.16; PyTorch 2.0.1; CUDA 11.8
-->

---
layout: default
class: titan backup
---

# Backup · evaluation cohorts

<table><thead><tr><th>Cohort</th><th>Scale / labels</th></tr></thead><tbody><tr><td>TCGA-UT-8K</td><td>25,495 ROIs / 9,662 WSIs · 32 classes</td></tr><tr><td>TCGA-OT</td><td>11,186 WSIs · 46 classes</td></tr><tr><td>OT108 / EBRAINS</td><td>108 / 30 subtyping classes</td></tr><tr><td>TCGA-Slide-Reports</td><td>10,108 slide-report pairs</td></tr><tr><td>Rare-Cancer</td><td>19,626 WSIs · 43 rare + 143 common types</td></tr><tr><td>Rare-Cancer-Public</td><td>14,062 WSIs · 29 rare + 98 common types</td></tr><tr><td>Rare-Cancer-External</td><td>39 WSIs · 12 rare ovarian / soft-tissue types</td></tr></tbody></table>

<div class="source">Methods: downstream evaluation datasets</div><div class="page-number">B04</div>

<!--


Source detail retained from original topic (for presenter reference):
# 8 · Experimental setup, benchmarks, and compute




## Pretraining settings

| Setting | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|
| Context | $16\times16$ features | $8,192^2$-pixel ROI | $64\times64$ features |
| A100 GPUs, 80 GB each | 4 | 8 | 8 |
| Local batch/GPU | 256 | 196 | 16 |
| Gradient accumulation | Not specified | 2 | 2 |
| Effective batch, reported | Not explicit | 3,136 | 256 |
| Epochs / iterations | 270 / 91,260 | Not provided | Not provided |

## Principal benchmark datasets

| Dataset | Scale / labels |
|---|---|
| TCGA-UT-8K | 25,495 ROIs from 9,662 WSIs; 32 classes |
| TCGA-OT | 11,186 WSIs; 46 classes |
| OT108 / EBRAINS | 108 / 30 subtyping classes |
| TCGA-Slide-Reports | 10,108 slide-report pairs |
| Rare-Cancer | 19,626 WSIs; 43 rare + 143 common types |
| Rare-Cancer-Public | 14,062 WSIs; 29 rare + 98 common types |
| Rare-Cancer-External | 39 WSIs; 12 rare ovarian/soft-tissue types |

Exact learning rates, weight decay, and stage 2–3 durations: Supplementary Tables 3, 9–10. [Source limitation: detail not established in supplied PDF; do not infer.]




## 🎨 Visual/Data Support



Figure 1a · Mass-340K distribution

### Evaluation protocol

- TCGA: label-stratified, site-preserving splits
- External cohorts: CPTAC, DHMC, EBRAINS where available
- Linear probe: L-BFGS; 45 regularization values, $10^{-6}$–$10^5$
- Few-shot: 50 sampled runs
- Uncertainty: five folds or 1,000 bootstraps
- Downstream: one RTX 3090, 24 GB
- Python 3.9.16; PyTorch 2.0.1; CUDA 11.8
-->

---
layout: default
class: titan backup
---

# Backup · evaluation protocol

<div class="point"><h2>Linear probe</h2><p>L-BFGS; 45 regularization values between 10⁻⁶ and 10⁵.</p></div><div class="point"><h2>Splits and repeated sampling</h2><p>TCGA site-preserving stratification; external cohorts where available; few-shot evaluation over 50 sampled runs.</p></div><div class="point"><h2>Downstream compute</h2><p>One RTX 3090, 24 GB · Python 3.9.16 · PyTorch 2.0.1 · CUDA 11.8</p></div><p class="qualification">Survival: regularization selected by best average test performance across five folds, as reported. Cross-modal retrieval is class based.</p>

<div class="source">Methods: evaluation setting; statistical analysis</div><div class="page-number">B05</div>

<!--


Source detail retained from original topic (for presenter reference):
# 8 · Experimental setup, benchmarks, and compute




## Pretraining settings

| Setting | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|
| Context | $16\times16$ features | $8,192^2$-pixel ROI | $64\times64$ features |
| A100 GPUs, 80 GB each | 4 | 8 | 8 |
| Local batch/GPU | 256 | 196 | 16 |
| Gradient accumulation | Not specified | 2 | 2 |
| Effective batch, reported | Not explicit | 3,136 | 256 |
| Epochs / iterations | 270 / 91,260 | Not provided | Not provided |

## Principal benchmark datasets

| Dataset | Scale / labels |
|---|---|
| TCGA-UT-8K | 25,495 ROIs from 9,662 WSIs; 32 classes |
| TCGA-OT | 11,186 WSIs; 46 classes |
| OT108 / EBRAINS | 108 / 30 subtyping classes |
| TCGA-Slide-Reports | 10,108 slide-report pairs |
| Rare-Cancer | 19,626 WSIs; 43 rare + 143 common types |
| Rare-Cancer-Public | 14,062 WSIs; 29 rare + 98 common types |
| Rare-Cancer-External | 39 WSIs; 12 rare ovarian/soft-tissue types |

Exact learning rates, weight decay, and stage 2–3 durations: Supplementary Tables 3, 9–10. [Source limitation: detail not established in supplied PDF; do not infer.]




## 🎨 Visual/Data Support



Figure 1a · Mass-340K distribution

### Evaluation protocol

- TCGA: label-stratified, site-preserving splits
- External cohorts: CPTAC, DHMC, EBRAINS where available
- Linear probe: L-BFGS; 45 regularization values, $10^{-6}$–$10^5$
- Few-shot: 50 sampled runs
- Uncertainty: five folds or 1,000 bootstraps
- Downstream: one RTX 3090, 24 GB
- Python 3.9.16; PyTorch 2.0.1; CUDA 11.8
-->

---
layout: default
class: titan backup
---

# Backup · aggregate scores

<table><thead><tr><th>Model</th><th>Morphology</th><th>Challenging</th><th>Molecular</th><th>Survival</th></tr></thead><tbody><tr><td><b>TITAN</b></td><td><b>0.781</b></td><td><b>0.715</b></td><td><b>0.781</b></td><td><b>0.716</b></td></tr><tr><td>TITANᵥ</td><td>0.769</td><td>0.700</td><td>0.779</td><td>0.711</td></tr><tr><td>Mean / CONCHv1.5</td><td>0.716</td><td>0.631</td><td>0.725</td><td>0.699</td></tr><tr><td>PRISM</td><td>0.737</td><td>0.650</td><td>0.768</td><td>0.680</td></tr><tr><td>GigaPath</td><td>0.691</td><td>0.596</td><td>0.710</td><td>0.684</td></tr><tr><td>CHIEF</td><td>0.703</td><td>0.541</td><td>0.734</td><td>0.691</td></tr></tbody></table><p class="qualification">Morphology: mixed BA / AUROC (14 tasks); challenging: BA (4-task subset); molecular: AUROC (39); survival: c-index (6). Molecular: P = 0.060 vs PRISM, P = 0.420 vs TITANᵥ.</p>

<div class="source">Fig. 2c · Exact printed aggregate labels</div><div class="page-number">B06</div>

<!--


Source detail retained from original topic (for presenter reference):
# 9 · Main quantitative results




## Absolute aggregate scores printed in Figure 2c

| Model | Morphology (14) | Challenging (4) | Molecular (39) | Survival (6) |
|---|---:|---:|---:|---:|
| **TITAN** | **0.781** | **0.715** | **0.781** | **0.716** |
| TITAN$_V$ | 0.769 | 0.700 | 0.779 | 0.711 |
| Mean, CONCHv1.5 | 0.716 | 0.631 | 0.725 | 0.699 |
| PRISM | 0.737 | 0.650 | 0.768 | 0.680 |
| GigaPath | 0.691 | 0.596 | 0.710 | 0.684 |
| CHIEF | 0.703 | 0.541 | 0.734 | 0.691 |

Morphology: mixed balanced accuracy/AUROC across tasks. Challenging: balanced accuracy. Molecular: AUROC. Survival: c-index. Challenging tasks are a subset, not an additional independent task family.

## Language and retrieval comparisons reported in Results

| Evaluation versus PRISM | Authors’ reported gain |
|---|---:|
| Multiclass zero-shot balanced accuracy | +56.52% |
| EBRAINS zero-shot balanced accuracy | +121.9% |
| Report generation, average of three metrics | +161% |
| Rare-Cancer retrieval Accuracy@K | +14.8% |
| Report-to-slide / slide-to-report Recall@K | +10.5% / +20.5% |

Reported percentage gains retain the authors’ comparison scale; do not read them as absolute score or percentage-point differences.




## 🎨 Visual/Data Support



Figure 2c · Aggregate evaluation with significance

Figure 4d · Bidirectional cross-modal retrieval

### Statistical qualification

- Molecular: TITAN vs PRISM $P=0.060$
- Molecular: TITAN vs TITAN$_V$ $P=0.420$
- Numerical leads are not uniformly significant
- Hierarchical beta GLMM; Wald tests; Tukey correction
-->

---
layout: default
class: titan backup
---

# Backup · reported relative gains

<table><thead><tr><th>Evaluation versus PRISM</th><th>Reported gain</th></tr></thead><tbody><tr><td>Multiclass zero-shot balanced accuracy</td><td>+56.52%</td></tr><tr><td>EBRAINS zero-shot balanced accuracy</td><td>+121.9%</td></tr><tr><td>Report generation · mean of 3 metrics</td><td>+161%</td></tr><tr><td>Rare-Cancer retrieval Accuracy@K</td><td>+14.8%</td></tr><tr><td>Report → slide Recall@K</td><td>+10.5%</td></tr><tr><td>Slide → report Recall@K</td><td>+20.5%</td></tr></tbody></table><p class="qualification">Authors’ relative comparisons, not percentage-point differences. Report metrics: METEOR, ROUGE-1, BLEU-1. Lexical metric gains do not establish diagnostic safety.</p>

<div class="source">Results; Figs. 3b,d and 4a,d</div><div class="page-number">B07</div>

<!--


Source detail retained from original topic (for presenter reference):
# 9 · Main quantitative results




## Absolute aggregate scores printed in Figure 2c

| Model | Morphology (14) | Challenging (4) | Molecular (39) | Survival (6) |
|---|---:|---:|---:|---:|
| **TITAN** | **0.781** | **0.715** | **0.781** | **0.716** |
| TITAN$_V$ | 0.769 | 0.700 | 0.779 | 0.711 |
| Mean, CONCHv1.5 | 0.716 | 0.631 | 0.725 | 0.699 |
| PRISM | 0.737 | 0.650 | 0.768 | 0.680 |
| GigaPath | 0.691 | 0.596 | 0.710 | 0.684 |
| CHIEF | 0.703 | 0.541 | 0.734 | 0.691 |

Morphology: mixed balanced accuracy/AUROC across tasks. Challenging: balanced accuracy. Molecular: AUROC. Survival: c-index. Challenging tasks are a subset, not an additional independent task family.

## Language and retrieval comparisons reported in Results

| Evaluation versus PRISM | Authors’ reported gain |
|---|---:|
| Multiclass zero-shot balanced accuracy | +56.52% |
| EBRAINS zero-shot balanced accuracy | +121.9% |
| Report generation, average of three metrics | +161% |
| Rare-Cancer retrieval Accuracy@K | +14.8% |
| Report-to-slide / slide-to-report Recall@K | +10.5% / +20.5% |

Reported percentage gains retain the authors’ comparison scale; do not read them as absolute score or percentage-point differences.




## 🎨 Visual/Data Support



Figure 2c · Aggregate evaluation with significance

Figure 4d · Bidirectional cross-modal retrieval

### Statistical qualification

- Molecular: TITAN vs PRISM $P=0.060$
- Molecular: TITAN vs TITAN$_V$ $P=0.420$
- Numerical leads are not uniformly significant
- Hierarchical beta GLMM; Wald tests; Tukey correction
-->

---
layout: default
class: titan backup compact-ablations
---

# Backup · remaining ablations

<table><thead><tr><th>Design comparison</th><th>Reported gain</th></tr></thead><tbody><tr><td>Vision SSL vs language alignment alone</td><td>+2%</td></tr><tr><td>8,192² vs 4,096²-pixel regions</td><td>+3.6%</td></tr><tr><td>Full data vs 12.5%</td><td>+3.65%</td></tr><tr><td>Full data vs 25%</td><td>+3.21%</td></tr><tr><td>Full data vs 50%</td><td>+1.21%</td></tr></tbody></table><table><thead><tr><th>Stage variant</th><th>Mean BA</th><th>Printed change</th></tr></thead><tbody><tr><td>Full TITAN</td><td>0.599</td><td>Reference</td></tr><tr><td>No stage 1</td><td>0.598</td><td>−0.4%</td></tr><tr><td>No stage 2</td><td>0.577</td><td>−3.6%</td></tr><tr><td>No stage 3</td><td>0.561</td><td>−7.3%</td></tr><tr><td>MH-ABMIL</td><td>0.588</td><td>−1.9%</td></tr></tbody></table>

<div class="source">Results; Figs. 2a,d and 3c · Rounded labels and author-reported relative changes</div><div class="page-number">B08</div>

<!--


Source detail retained from original topic (for presenter reference):
# 10 · Ablations and design sensitivity




## Visual-backbone design choices

| Comparison | Authors’ reported gain |
|---|---:|
| ALiBi vs absolute positional encoding | +1.89% |
| Six vs twelve layers | +1.16% |
| Six vs four layers | +1.74% |
| Vision pretraining vs language alignment alone | +2% |
| $8,192^2$ vs $4,096^2$-pixel regions | +3.6% |
| Full data vs 12.5% / 25% / 50% | +3.65% / +3.21% / +1.21% |

## Zero-shot stage ablations: Figure 3c

| Variant | Vision SSL | ROI text | Report text | Mean BA | Printed change |
|---|:---:|:---:|:---:|---:|---:|
| Full TITAN | Yes | Yes | Yes | 0.599 | Reference |
| No stage 1 | No | Yes | Yes | 0.598 | −0.4% |
| No stage 2 | Yes | No | Yes | 0.577 | −3.6% |
| No stage 3 | Yes | Yes | No | 0.561 | −7.3% |
| MH-ABMIL | No | Yes | Yes | 0.588 | −1.9% |

- All stage comparisons average four challenging subtyping tasks
- Scores and changes reproduce the figure’s rounded labels
- Temperature and loss-weight sensitivity sweeps: **[Source limitation: detail not established in supplied PDF; do not infer.]**




## 🎨 Visual/Data Support



Figure 2d · Position, depth, and language-pretraining ablations

Figure 3c · Stage-removal and backbone ablations

Region-size details: Supplementary Tables 66–77. Full-data scaling: Figure 2a and Results. Stage 3 removal has the largest zero-shot effect among tested stage removals.
-->

---
layout: default
class: titan backup
---

# Backup · a second report example

<div class="point"><h2>Brain · TCGA-41-3915</h2><p>Clinical report: glioblastoma, WHO IV.</p></div><figure v-click="1" class="wide-figure"><img src="/figures/report-brain.png" alt="Fig. 3e · Clinical report, TITAN generation, and PRISM generation."><figcaption>Fig. 3e · Clinical report, TITAN generation, and PRISM generation.</figcaption></figure><div v-click="2"><div class="comparison"><div><h2>TITAN</h2><p>High-grade glioblastoma, WHO IV</p></div><div><h2>PRISM</h2><p>High-grade myxofibrosarcoma</p></div></div><p class="qualification">Paraphrased summaries; selected success, not exhaustive error analysis.</p></div>

<div class="source">Fig. 3e</div><div class="page-number">B09</div>

<!--


Source detail retained from original topic (for presenter reference):
# 11 · Qualitative results and case studies




## Report-generation examples, paraphrased

| Case | Clinical report | TITAN | PRISM |
|---|---|---|---|
| TCGA-C5-A3HL, cervix | Poorly differentiated squamous carcinoma | Cervical squamous carcinoma | High-grade serous carcinoma; organ unspecified |
| TCGA-41-3915, brain | Glioblastoma, WHO IV | High-grade glioblastoma, WHO IV | High-grade myxofibrosarcoma |

## Paraganglioma query: retrieved slides

| Retrieved diagnosis | Cosine similarity |
|---|---:|
| Paraganglioma | 0.794 |
| Pheochromocytoma | 0.651 |
| Hemangioma | 0.341 |
| Leiomyosarcoma | 0.212 |

## Attention-head specialization

- Most heads: dense tumor regions
- Head 10: tumor-adjacent stroma
- Head 11: nontumor and tissue-specific morphology
- Visual self-attention maps; cross-modal maps not reported

Selected author-identified successes; not an exhaustive error analysis.




## 🎨 Visual/Data Support



Figure 3e · Clinical versus generated reports

Extended Data Figure 5 · Thymoma attention heads

Retrieval values: Figure 4b. Additional reports and retrieval examples: Extended Data Figures 7–8.
-->

---
layout: default
class: titan backup
---

# Backup · sources and reporting gaps

<div class="point"><h2>Paper supplied</h2><p>Ding et al. A multimodal whole-slide foundation model for pathology. Nature Medicine 31, 3749–3761 (2025). DOI: 10.1038/s41591-025-03982-3.</p></div><div class="point"><h2>Details not established here</h2><p>Tokenization limits; decoder masking / ordering; complete loss formulas and weights; sensitivity sweeps.</p></div><div class="point"><h2>Supplementary material referenced, not supplied</h2><p>Caption prompts: Tables 4–8; training hyperparameters: Tables 3, 9–10. Citation-count assessment is outside the supplied paper.</p></div>

<div class="source">Source boundaries from supplied PDF; see presenter notes</div><div class="page-number">B10</div>

<!--


Source detail retained from original topic (for presenter reference):
# 7 · Mathematical framework and optimization




## 2D ALiBi: Equation 1, as printed

$$
\operatorname{softmax}\!\left(q_i k_j^\top-m\sqrt{(i_x-j_x)^2+(i_y-j_y)^2}\right)
$$

- $q_i,k_j\in\mathbb{R}^{d}$: query and key vectors
- $m$: predefined head-specific slope
- Grid coordinates: $20\times$ patch coordinates divided by 512
- Penalizes attention between **spatially distant** patches

## Zero-shot classification: Equation 2

$$
\hat y_i=\arg\max_c u_i^\top v_c
$$

- $u_i$: $\ell_2$-normalized slide embedding
- $v_c$: $\ell_2$-normalized class text embedding
- Prompt ensembles reduce sensitivity to wording

| Training / evaluation | Objective stated in the paper |
|---|---|
| Stage 1 | iBOT distillation and masked image modeling |
| Stages 2–3 | CoCa contrastive and generative objectives |
| Linear probe / survival | Regularized cross-entropy / linear Cox model |




## 🎨 Visual/Data Support



Figure 3a · Language-guided zero-shot classification

Equation sources: Methods, positional encoding and zero-shot classification. Complete iBOT/CoCa loss formulas and loss weights are not reproduced in the supplied paper. [Source limitation: detail not established in supplied PDF; do not infer.]
-->

---
layout: default
class: titan backup
---

# Backup · technical references 1/2

<div class="reference"><b>[10] Lu et al.</b><p>A visual-language foundation model for computational pathology. <i>Nature Medicine 30, 863–874 (2024)</i> · CONCH</p></div><div class="reference"><b>[62] Shaikovski et al.</b><p>PRISM: a multi-modal generative foundation model for slide-level histopathology. <i>arXiv:2405.10254 (2024)</i> · PRISM</p></div><div class="reference"><b>[83] Wang et al.</b><p>A pathology foundation model for cancer diagnosis and prognosis prediction. <i>Nature 634, 970–978 (2024)</i> · CHIEF</p></div><div class="reference"><b>[86] Zhou et al.</b><p>iBOT: image BERT pre-training with online tokenizer. <i>ICLR (2022)</i> · Visual SSL</p></div>

<div class="source">Reference numbering follows the TITAN paper</div><div class="page-number">B11</div>

<!--


Source detail retained from original topic (for presenter reference):
# 15 · Q&A and key technical references




## Technical discussion

- How much whole-slide context survives regional pretraining?
- Why does stage 1 removal have a small zero-shot effect despite strong visual transfer?
- What information is complementary between ROI captions and clinical reports?
- How should molecular results with $P=0.060$ be interpreted?
- Which efficiency measurements are still needed for deployment assessment?




## 🎨 Visual/Data Support

### Selected bibliography from the paper

| Ref. | Citation | Role |
|---|---|---|
| 10 | Lu et al. *A visual-language foundation model for computational pathology*. Nature Medicine 30, 863–874 (2024) | CONCH lineage |
| 62 | Shaikovski et al. *PRISM: a multi-modal generative foundation model for slide-level histopathology*. arXiv:2405.10254 (2024) | Comparator |
| 83 | Wang et al. *A pathology foundation model for cancer diagnosis and prognosis prediction*. Nature 634, 970–978 (2024) | CHIEF |
| 86 | Zhou et al. *iBOT: image BERT pre-training with online tokenizer*. ICLR (2022) | Visual SSL |
| 88 | Lu et al. *A multimodal generative AI copilot for human pathology*. Nature 634, 466–473 (2024) | PathChat |
| 93 | Bär et al. *Frozen feature augmentation for few-shot image classification*. CVPR, 16046–16057 (2024) | Augmentation |
| 94 | Press et al. *Train short, test long: attention with linear biases enables input length extrapolation*. ICLR (2022) | ALiBi |
| 95 | Yu et al. *CoCa: contrastive captioners are image-text foundation models*. TMLR (2022) | Alignment |

Bibliography table is the visual anchor for this slide. Reference numbers match the TITAN paper.
-->

---
layout: default
class: titan backup
---

# Backup · technical references 2/2

<div class="reference"><b>[88] Lu et al.</b><p>A multimodal generative AI copilot for human pathology. <i>Nature 634, 466–473 (2024)</i> · PathChat</p></div><div class="reference"><b>[93] Bär et al.</b><p>Frozen feature augmentation for few-shot image classification. <i>CVPR, 16046–16057 (2024)</i> · Augmentation</p></div><div class="reference"><b>[94] Press et al.</b><p>Train short, test long: attention with linear biases enables input length extrapolation. <i>ICLR (2022)</i> · ALiBi</p></div><div class="reference"><b>[95] Yu et al.</b><p>CoCa: contrastive captioners are image-text foundation models. <i>TMLR (2022)</i> · CoCa</p></div>

<div class="source">Reference numbering follows the TITAN paper</div><div class="page-number">B12</div>

<!--


Source detail retained from original topic (for presenter reference):
# 15 · Q&A and key technical references




## Technical discussion

- How much whole-slide context survives regional pretraining?
- Why does stage 1 removal have a small zero-shot effect despite strong visual transfer?
- What information is complementary between ROI captions and clinical reports?
- How should molecular results with $P=0.060$ be interpreted?
- Which efficiency measurements are still needed for deployment assessment?




## 🎨 Visual/Data Support

### Selected bibliography from the paper

| Ref. | Citation | Role |
|---|---|---|
| 10 | Lu et al. *A visual-language foundation model for computational pathology*. Nature Medicine 30, 863–874 (2024) | CONCH lineage |
| 62 | Shaikovski et al. *PRISM: a multi-modal generative foundation model for slide-level histopathology*. arXiv:2405.10254 (2024) | Comparator |
| 83 | Wang et al. *A pathology foundation model for cancer diagnosis and prognosis prediction*. Nature 634, 970–978 (2024) | CHIEF |
| 86 | Zhou et al. *iBOT: image BERT pre-training with online tokenizer*. ICLR (2022) | Visual SSL |
| 88 | Lu et al. *A multimodal generative AI copilot for human pathology*. Nature 634, 466–473 (2024) | PathChat |
| 93 | Bär et al. *Frozen feature augmentation for few-shot image classification*. CVPR, 16046–16057 (2024) | Augmentation |
| 94 | Press et al. *Train short, test long: attention with linear biases enables input length extrapolation*. ICLR (2022) | ALiBi |
| 95 | Yu et al. *CoCa: contrastive captioners are image-text foundation models*. TMLR (2022) | Alignment |

Bibliography table is the visual anchor for this slide. Reference numbers match the TITAN paper.
-->

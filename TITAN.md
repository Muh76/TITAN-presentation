---
theme: default
title: 'TITAN: A multimodal whole-slide foundation model for pathology'
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
routerMode: hash
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
exportFilename: TITAN-guided
export:
  withClicks: false
defaults:
  layout: default
  class: titan
---

# TITAN

<div class="cover-sub">A multimodal whole-slide<br>foundation model for pathology</div><div class="columns"><div><div class="point"><h2>Reusable slide representations</h2><p>Visual self-supervision meets regional and whole-slide language.</p></div><p class="authors">Tong Ding, Sophia J. Wagner, Andrew H. Song,<br>Richard J. Chen, et al.</p><p class="citation">Nature Medicine 31, 3749–3761 (2025)<br>5 November 2025 · DOI: 10.1038/s41591-025-03982-3</p></div><div><div v-click="1"><div class="numbers"><div><b>335,645</b><span>whole-slide images · 20 organs</span></div><div><b>423,122</b><span>synthetic ROI-caption pairs</span></div><div><b>182,862</b><span>slide-report pairs</span></div></div></div></div></div>

<div class="source">Ding et al. · Abstract; Fig. 1a</div><div class="page-number">01</div>

<!--


Source detail retained from original topic (for presenter reference):
Whole-slide representation learning

TITAN: A multimodal whole-slidefoundation model for pathology




**Tong Ding, Sophia J. Wagner, Andrew H. Song, Richard J. Chen, et al.**

Equal first contribution: Ding, Wagner, Song, Chen
Joint supervision: Long Phi Le and Faisal Mahmood

*Nature Medicine* **31**, 3749–3761 (2025)
Published online 5 November 2025
DOI: **10.1038/s41591-025-03982-3**

Feature-space visual SSL plus regional and whole-slide language alignment for transferable pathology representations

Citation count and citation-based impact assessment are not provided in the supplied PDF. [Source limitation: detail not established in supplied PDF; do not infer.]




## 🎨 Visual/Data Support



Figure 1b · WSI-to-slide embedding pipeline

| Pretraining resource | Scale |
|---|---:|
| Whole-slide images | 335,645 |
| Organs | 20 |
| ROI-caption pairs | 423,122 |
| Slide-report pairs | 182,862 |
-->

---
layout: default
class: titan figure-portrait
---

# Whole slides need context

<div class="columns"><div><div class="point"><h2>Gigapixel images, limited labels</h2><p>A slide contains a long, variable sequence of patch features.</p></div><div v-click="2"><div class="point"><h2>Small cohorts constrain learning</h2><p>Rare conditions particularly need transferable representations.</p></div></div><div v-click="3"><div class="point"><h2>One embedding, multiple tasks</h2><p>Classification, prognosis, and retrieval.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/pipeline.png" alt="Fig. 1b · A patch encoder feeds a contextual slide encoder."><figcaption>Fig. 1b · A patch encoder feeds a contextual slide encoder.</figcaption></figure></div></div>

<div class="source">Introduction; Fig. 1b</div><div class="page-number">02</div>

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
class: titan 
---

# What should a slide model learn?

<div class="flow"><div class="node" ><span class="step">01</span><h2>Tissue context</h2><p>Can patch-level SSL transfer to whole slides?</p></div><div class="node" v-click="1"><span class="step">02</span><h2>Language alignment</h2><p>Do regional captions and reports add complementary information?</p></div><div class="node" v-click="2"><span class="step">03</span><h2>Transfer</h2><p>Can frozen embeddings serve limited-data tasks?</p></div></div><div v-click="3"><div class="takeaway">Evaluate visual quality, language capabilities, and rare-cancer retrieval separately.</div></div>

<div class="source">Results; Figs. 1–4 · Questions summarize design rationales</div><div class="page-number">03</div>

<!--


Source detail retained from original topic (for presenter reference):
# 3 · Research questions and technical objectives




| Question organized from the paper’s objectives | Proposed mechanism | Evidence |
|---|---|---|
| Can patch-level SSL transfer to slide encoding? | iBOT on spatial patch-feature grids | Fig. 1c; 2a,c |
| Can regional training support whole-slide inference? | 2D ALiBi extrapolation | Eq. 1; Fig. 2d |
| Does detailed morphological language help? | Synthetic ROI-caption alignment | Fig. 3c |
| Do clinical reports add complementary supervision? | Slide-report continual pretraining | Fig. 3c,d |
| Can frozen embeddings serve limited-data tasks? | Probing, few-shot learning, rare-cancer retrieval | Fig. 2f; 4a |
| Does language alignment improve visual representations? | Compare TITAN with TITAN$_V$ | Fig. 2c; 4c |

## Evaluation objectives

- Morphology, grading, molecular status, disease-specific survival
- Zero-shot classification and report generation
- Slide retrieval and bidirectional slide-report retrieval




## 🎨 Visual/Data Support



Figure 1d · Multiscale vision-language alignment

Questions organize the authors’ design rationales; they are not additional formal hypotheses.
-->

---
layout: default
class: titan 
---

# Preserve the spatial feature grid

<div class="point"><h2>Train on features, retain tissue layout</h2><p>Pre-extracted CONCHv1.5 features become the slide Transformer’s input.</p></div><div class="flow"><div class="node" v-click="1"><span class="step">01</span><h2>Tissue patches</h2><p>512 × 512 pixels at 20×</p></div><div class="node" v-click="2"><span class="step">02</span><h2>Patch features</h2><p>768 dimensions · fixed patch encoder</p></div><div class="node" v-click="3"><span class="step">03</span><h2>Spatial grid</h2><p>Original patch positions preserved</p></div><div class="node" v-click="4"><span class="step">04</span><h2>Slide embedding</h2><p>Contextual TITAN representation</p></div></div><div v-click="5"><div class="takeaway">All three TITAN training stages operate in feature space.</div></div>

<div class="source">Fig. 1b,c; Methods: vision pretraining</div><div class="page-number">04</div>

<!--


Source detail retained from original topic (for presenter reference):
# 4 · System architecture and three-stage pretraining




## Shared visual processing

1. Segment tissue and extract nonoverlapping patches
2. Compute CONCHv1.5 embeddings
3. Preserve patch positions in a 2D feature grid
4. Encode contextual features with the TITAN Transformer

| Stage | Input and supervision | Method | Output |
|---|---|---|---|
| 1 | ROI feature crops; visual views | iBOT SSL | TITAN$_V$ |
| 2 | ROI features and synthetic captions | CoCa alignment | ROI-aligned intermediate |
| 3 | Large slide crops and clinical reports | Continued CoCa alignment | TITAN |

## Initialization and downstream interfaces

- Visual backbone initialized from TITAN$_V$, then fine-tuned
- Text encoder and multimodal decoder initialized from CONCHv1.5
- All three components fine-tuned during language alignment
- Global embedding for probing, retrieval, and survival
- Multimodal decoder for pathology report generation




## 🎨 Visual/Data Support



Figure 1c · Feature-space iBOT stage



Figure 1d · ROI captions followed by slide reports
-->

---
layout: default
class: titan 
---

# Three stages build TITAN

<div class="point"><h2>Visual learning comes first</h2><p>Then detailed morphology and clinical language align the representation.</p></div><div class="flow"><div class="node" v-click="1"><span class="step">01</span><h2>1 · Visual SSL</h2><p>ROI feature crops → iBOT → TITANᵥ</p></div><div class="node" v-click="2"><span class="step">02</span><h2>2 · ROI captions</h2><p>423,122 region-caption pairs → CoCa</p></div><div class="node" v-click="3"><span class="step">03</span><h2>3 · Slide reports</h2><p>182,862 slide-report pairs → TITAN</p></div></div><div v-click="4"><div class="takeaway">TITANᵥ names the vision-only model; TITAN names the full model.</div></div>

<div class="source">Fig. 1c,d; Results: scaling SSL</div><div class="page-number">05</div>

<!--


Source detail retained from original topic (for presenter reference):
# 4 · System architecture and three-stage pretraining




## Shared visual processing

1. Segment tissue and extract nonoverlapping patches
2. Compute CONCHv1.5 embeddings
3. Preserve patch positions in a 2D feature grid
4. Encode contextual features with the TITAN Transformer

| Stage | Input and supervision | Method | Output |
|---|---|---|---|
| 1 | ROI feature crops; visual views | iBOT SSL | TITAN$_V$ |
| 2 | ROI features and synthetic captions | CoCa alignment | ROI-aligned intermediate |
| 3 | Large slide crops and clinical reports | Continued CoCa alignment | TITAN |

## Initialization and downstream interfaces

- Visual backbone initialized from TITAN$_V$, then fine-tuned
- Text encoder and multimodal decoder initialized from CONCHv1.5
- All three components fine-tuned during language alignment
- Global embedding for probing, retrieval, and survival
- Multimodal decoder for pathology report generation




## 🎨 Visual/Data Support



Figure 1c · Feature-space iBOT stage



Figure 1d · ROI captions followed by slide reports
-->

---
layout: default
class: titan figure-landscape
---

# Learn from multiple regional views

<div class="columns"><div><div class="point"><h2>One region, multiple views</h2><p>Start with a <b>16 × 16</b> feature grid covering 8,192 × 8,192 pixels.</p></div><div v-click="2"><div class="point"><h2>Two global, ten local crops</h2><p>14 × 14 global grids; 6 × 6 local grids.</p></div></div><div v-click="3"><div class="point"><h2>Augment in feature space</h2><p>Horizontal/vertical flips and feature posterization.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/visual-ssl.png" alt="Fig. 1c · iBOT teacher–student learning on spatial features."><figcaption>Fig. 1c · iBOT teacher–student learning on spatial features.</figcaption></figure></div></div>

<div class="source">Fig. 1c; Methods: vision pretraining</div><div class="page-number">06</div>

<!--


Source detail retained from original topic (for presenter reference):
# 5 · Modality alignment and representation learning




## Visual inputs, tokens, and views

| Component | Reported specification |
|---|---|
| Patch input | $512\times512$ pixels at $20\times$ |
| Patch encoder / feature width | CONCHv1.5 / 768 |
| Stage 1 region | $16\times16$ features; $8,192\times8,192$ pixels |
| Global views | Two $14\times14$ feature crops |
| Local views | Ten $6\times6$ feature crops |
| Augmentation | Horizontal/vertical flips and feature posterization |

## Regional language construction

| Step | Reported operation |
|---|---|
| ROI subdivision | 64 patches, each $1,024\times1,024$ pixels |
| Morphological selection | K-means, $K=16$; one patch per cluster |
| Description | PathChat receives the 16 selected patches |
| Language diversification | Qwen2-7B-Instruct rewriting |

- Clinical reports: extract slide-specific descriptions; remove unrelated information
- Text tokenization and sequence-length limits: **[Source limitation: detail not established in supplied PDF; do not infer.]**




## 🎨 Visual/Data Support



Figure 1c · Spatial feature grid and multiview sampling

### Aligned language corpora

| Corpus | Pairs |
|---|---:|
| Synthetic ROI captions | 423,122 |
| Slide-specific pathology reports | 182,862 |

Methods: synthetic caption generation and slide-report curation. Prompt details reside in Supplementary Tables 4–8, not included in the supplied PDF.
-->

---
layout: default
class: titan 
---

# Captions provide morphological detail

<div class="point"><h2>Select representative tissue before describing it</h2><p>An 8,192 × 8,192 ROI supplies diverse visual evidence.</p></div><div class="flow"><div class="node" v-click="1"><span class="step">01</span><h2>64 patches</h2><p>1,024 × 1,024 pixels each</p></div><div class="node" v-click="2"><span class="step">02</span><h2>16 clusters</h2><p>K-means; one patch per cluster</p></div><div class="node" v-click="3"><span class="step">03</span><h2>PathChat</h2><p>Describe the selected patches</p></div><div class="node" v-click="4"><span class="step">04</span><h2>Qwen2 rewriting</h2><p>Diversify language</p></div></div><div v-click="5"><div class="takeaway">Stage 2 supplies <b>423,122</b> ROI-caption pairs; stage 3 adds curated slide-specific reports.</div></div>

<div class="source">Methods: synthetic caption generation; slide-report curation</div><div class="page-number">07</div>

<!--
Unresolved source details: tokenization and maximum sequence lengths are not established in the supplied PDF. Prompts are referenced in Supplementary Tables 4–8; do not invent them.

Source detail retained from original topic (for presenter reference):
# 5 · Modality alignment and representation learning




## Visual inputs, tokens, and views

| Component | Reported specification |
|---|---|
| Patch input | $512\times512$ pixels at $20\times$ |
| Patch encoder / feature width | CONCHv1.5 / 768 |
| Stage 1 region | $16\times16$ features; $8,192\times8,192$ pixels |
| Global views | Two $14\times14$ feature crops |
| Local views | Ten $6\times6$ feature crops |
| Augmentation | Horizontal/vertical flips and feature posterization |

## Regional language construction

| Step | Reported operation |
|---|---|
| ROI subdivision | 64 patches, each $1,024\times1,024$ pixels |
| Morphological selection | K-means, $K=16$; one patch per cluster |
| Description | PathChat receives the 16 selected patches |
| Language diversification | Qwen2-7B-Instruct rewriting |

- Clinical reports: extract slide-specific descriptions; remove unrelated information
- Text tokenization and sequence-length limits: **[Source limitation: detail not established in supplied PDF; do not infer.]**




## 🎨 Visual/Data Support



Figure 1c · Spatial feature grid and multiview sampling

### Aligned language corpora

| Corpus | Pairs |
|---|---:|
| Synthetic ROI captions | 423,122 |
| Slide-specific pathology reports | 182,862 |

Methods: synthetic caption generation and slide-report curation. Prompt details reside in Supplementary Tables 4–8, not included in the supplied PDF.
-->

---
layout: default
class: titan 
---

# Two interfaces support two uses

<div class="point"><h2>A shared visual backbone feeds separate poolers</h2><p>The CoCa interface supports alignment and report generation.</p></div><div class="interface"><div class="backbone">TITAN visual backbone<br><small>6 Transformer layers · width 768</small></div><div class="branches"><div v-click="1"><div class="branch"><h2>1 contrastive query</h2><p>Global visual embedding ↔ text embedding</p><b>Zero-shot classification and retrieval</b></div></div><div v-click="2"><div class="branch"><h2>128 reconstruction queries</h2><p>128 visual tokens → multimodal text decoder</p><b>Pathology report generation</b></div></div></div></div><div v-click="3"><p class="qualification">Text encoder and decoder: 12 layers each, width 768, hidden width 3,072. Initialized from CONCHv1.5; all three components fine-tuned.</p></div>

<div class="source">Methods: vision-language continual pretraining · diagram redrawn from text</div><div class="page-number">08</div>

<!--
Unresolved: detailed decoder attention ordering and masking are not specified in the supplied PDF; no additional architecture is implied by this schematic.

Source detail retained from original topic (for presenter reference):
# 6 · Fusion mechanics and network layers




## Visual backbone

| Component | Configuration |
|---|---|
| Slide encoder | ViT; 6 Transformer layers |
| Self-attention | 12 heads; 64 dimensions/head |
| Embedding / hidden width | 768 / 3,072 |
| Input mapping | MLP replaces patch-embedding layer |
| Spatial mechanism | 2D ALiBi in attention scores |

## CoCa interface

| Component | Mechanism and purpose |
|---|---|
| Contrastive pooler | One query pools a global visual representation for text alignment |
| Reconstruction pooler | 128 queries produce 128 visual tokens for the multimodal decoder |
| Text encoder | 12 Transformer layers; width 768; hidden 3,072 |
| Multimodal decoder | 12 Transformer layers; width 768; hidden 3,072 |

- Global embeddings support zero-shot classification and retrieval
- Reconstruction tokens interact with the decoder for generation
- Decoder attention ordering and masking: **[Source limitation: detail not established in supplied PDF; do not infer.]**




## 🎨 Visual/Data Support



Figure 1d · Visual and language components

Pooler query counts and layer dimensions: Methods, “Vision-language continual pretraining.” The overview figure does not show the two poolers separately.
-->

---
layout: default
class: titan 
---

# ALiBi adds a spatial distance penalty

<div class="point"><h2>Nearby patches receive a stronger attention prior</h2><p>Train on regions; extrapolate to larger slide contexts.</p></div><div v-click="1"><div class="equation"><Formula tex="\operatorname{softmax}\left(q_i k_j^\top-m\sqrt{(i_x-j_x)^2+(i_y-j_y)^2}\right)" /></div></div><div v-click="2"><div class="definitions"><div><b>qᵢ kⱼᵀ</b><p>Content similarity<br>query and key vectors in ℝᵈ</p></div><div><b>Euclidean distance</b><p>Separation of patch positions<br>20× coordinates divided by 512</p></div><div><b>m</b><p>Predefined slope<br>specific to each attention head</p></div></div></div><div v-click="3"><div class="takeaway">Longer-context inference is supported; full-slide contextual coverage remains a limitation.</div></div>

<div class="source">Methods: positional encoding · Equation 1 as printed</div><div class="page-number">09</div>

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
class: titan figure-portrait
---

# Zero-shot prediction compares embeddings

<div class="columns"><div><div class="point"><h2>Choose the closest class text</h2><p>No task-specific classifier is fitted for this evaluation.</p></div><div v-click="1"><div class="equation small-eq"><Formula tex="\hat y_i=\arg\max_c u_i^\top v_c" /></div><div class="definitions two"><div><b>uᵢ</b><p>ℓ₂-normalized slide embedding</p></div><div><b>v꜀</b><p>ℓ₂-normalized class-text embedding</p></div></div></div><div v-click="3"><div class="point"><h2>Ensemble the prompts</h2><p>Multiple wordings reduce prompt sensitivity.</p></div></div></div><div><figure v-click="2" class=""><img src="/figures/zero-shot.png" alt="Fig. 3a · Select the class with the greatest cosine similarity."><figcaption>Fig. 3a · Select the class with the greatest cosine similarity.</figcaption></figure></div></div>

<div class="source">Methods: zero-shot classification · Equation 2</div><div class="page-number">10</div>

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
class: titan figure-landscape
---

# Evaluate transfer across clinical tasks

<div class="columns"><div><div class="point"><h2>Separate pretraining from evaluation</h2><p>Mass-340K spans <b>20 organs</b> and multiple stains and scanners.</p></div><div v-click="2"><div class="point"><h2>Test several uses of frozen embeddings</h2><p>Morphology, molecular status, survival, and low-data learning.</p></div></div><div v-click="3"><div class="point"><h2>Quantify uncertainty</h2><p>Five folds or 1,000 bootstraps; few-shot results over 50 sampled runs.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/dataset.png" alt="Fig. 1a · Mass-340K contains 335,645 WSIs."><figcaption>Fig. 1a · Mass-340K contains 335,645 WSIs.</figcaption></figure></div></div>

<div class="source">Fig. 1a; Methods: evaluation settings and datasets</div><div class="page-number">11</div>

<!--
Survival qualification: the paper chooses the Cox regularization coefficient using the best average test metric across five folds. Interpret these results with that model-selection procedure in mind. Full compute and cohort sizes appear in backup slides.

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
class: titan 
---

# TITAN leads the morphology comparison

<div class="point"><h2>Language alignment improves the aggregate score</h2><p>TITAN exceeds TITANᵥ and the evaluated baselines numerically.</p></div><div class="two-charts"><div v-click="1" class="chart"><h2>Morphological classification</h2><p class="metric">14 tasks · mixed balanced accuracy / AUROC · scale 0–1</p><div class="bar-row"><span>TITAN</span><div class="track"><div style="width:78.10000000000001%;background:#a32638"></div></div><b>0.781</b></div><div class="bar-row"><span>TITANᵥ</span><div class="track"><div style="width:76.9%;background:#dc8f86"></div></div><b>0.769</b></div><div class="bar-row"><span>Mean</span><div class="track"><div style="width:71.6%;background:#9c73a8"></div></div><b>0.716</b></div><div class="bar-row"><span>PRISM</span><div class="track"><div style="width:73.7%;background:#328b91"></div></div><b>0.737</b></div><div class="bar-row"><span>GigaPath</span><div class="track"><div style="width:69.1%;background:#d5b64b"></div></div><b>0.691</b></div><div class="bar-row"><span>CHIEF</span><div class="track"><div style="width:70.3%;background:#5283bb"></div></div><b>0.703</b></div></div><div v-click="2" class="chart"><h2>Challenging morphology</h2><p class="metric">4 tasks · balanced accuracy · scale 0–1</p><div class="bar-row"><span>TITAN</span><div class="track"><div style="width:71.5%;background:#a32638"></div></div><b>0.715</b></div><div class="bar-row"><span>TITANᵥ</span><div class="track"><div style="width:70.0%;background:#dc8f86"></div></div><b>0.700</b></div><div class="bar-row"><span>Mean</span><div class="track"><div style="width:63.1%;background:#9c73a8"></div></div><b>0.631</b></div><div class="bar-row"><span>PRISM</span><div class="track"><div style="width:65.0%;background:#328b91"></div></div><b>0.650</b></div><div class="bar-row"><span>GigaPath</span><div class="track"><div style="width:59.599999999999994%;background:#d5b64b"></div></div><b>0.596</b></div><div class="bar-row"><span>CHIEF</span><div class="track"><div style="width:54.1%;background:#5283bb"></div></div><b>0.541</b></div></div></div><div v-click="3"><p class="qualification">The four challenging tasks are a subset of morphology. Different patch encoders and pretraining datasets limit controlled attribution.</p></div>

<div class="source">Fig. 2c · Values transcribed from printed aggregate labels</div><div class="page-number">12</div>

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
class: titan 
---

# Numerical leads need statistical context

<div class="point"><h2>Molecular gains are not uniformly significant</h2><p>The molecular comparisons with PRISM and TITANᵥ do not reach P < 0.05.</p></div><div class="two-charts"><div v-click="1" class="chart"><h2>Molecular classification</h2><p class="metric">39 tasks · AUROC · scale 0–1</p><div class="bar-row"><span>TITAN</span><div class="track"><div style="width:78.10000000000001%;background:#a32638"></div></div><b>0.781</b></div><div class="bar-row"><span>TITANᵥ</span><div class="track"><div style="width:77.9%;background:#dc8f86"></div></div><b>0.779</b></div><div class="bar-row"><span>Mean</span><div class="track"><div style="width:72.5%;background:#9c73a8"></div></div><b>0.725</b></div><div class="bar-row"><span>PRISM</span><div class="track"><div style="width:76.8%;background:#328b91"></div></div><b>0.768</b></div><div class="bar-row"><span>GigaPath</span><div class="track"><div style="width:71.0%;background:#d5b64b"></div></div><b>0.710</b></div><div class="bar-row"><span>CHIEF</span><div class="track"><div style="width:73.4%;background:#5283bb"></div></div><b>0.734</b></div></div><div v-click="2" class="chart"><h2>Survival</h2><p class="metric">6 tasks · c-index · scale 0–1</p><div class="bar-row"><span>TITAN</span><div class="track"><div style="width:71.6%;background:#a32638"></div></div><b>0.716</b></div><div class="bar-row"><span>TITANᵥ</span><div class="track"><div style="width:71.1%;background:#dc8f86"></div></div><b>0.711</b></div><div class="bar-row"><span>Mean</span><div class="track"><div style="width:69.89999999999999%;background:#9c73a8"></div></div><b>0.699</b></div><div class="bar-row"><span>PRISM</span><div class="track"><div style="width:68.0%;background:#328b91"></div></div><b>0.680</b></div><div class="bar-row"><span>GigaPath</span><div class="track"><div style="width:68.4%;background:#d5b64b"></div></div><b>0.684</b></div><div class="bar-row"><span>CHIEF</span><div class="track"><div style="width:69.1%;background:#5283bb"></div></div><b>0.691</b></div></div></div><div v-click="3"><p class="qualification"><b>Molecular:</b> TITAN vs PRISM P = 0.060; vs TITANᵥ P = 0.420. Hierarchical beta GLMM, two-sided Wald tests, Tukey correction.</p></div>

<div class="source">Fig. 2c; Methods: statistical analysis</div><div class="page-number">13</div>

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
class: titan 
---

# Language alignment enables retrieval

<div class="columns"><div><div class="point"><h2>Retrieve in both directions</h2><p>Aligned slide and text embeddings share a searchable space.</p></div><div v-click="2"><div class="gain"><b>+10.5%</b><span>report → slide Recall@K</span></div><div class="gain"><b>+20.5%</b><span>slide → report Recall@K</span></div></div></div><div><figure v-click="1" class=""><img src="/figures/retrieval-cross.png" alt="Fig. 4d · 10,108 TCGA slide-report pairs; K = 1, 3, 5, 10."><figcaption>Fig. 4d · 10,108 TCGA slide-report pairs; K = 1, 3, 5, 10.</figcaption></figure></div></div><div v-click="3"><p class="qualification">Authors’ relative gains over PRISM, averaged over K; these are not percentage-point differences. Retrieval success is class based, not exact report identity.</p></div>

<div class="source">Results: cross-modal retrieval; Fig. 4d; Methods</div><div class="page-number">14</div>

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
class: titan figure-landscape
---

# Ablations favor spatial context

<div class="columns"><div><div class="point"><h2>Position and depth matter</h2><p>Six-layer TITANᵥ with ALiBi gives the strongest tested configuration.</p></div><div v-click="2"><div class="point"><h2>ALiBi vs absolute position</h2><p><b>+1.89%</b> reported performance gain.</p></div></div><div v-click="3"><div class="point"><h2>Six vs deeper or shallower</h2><p><b>+1.16%</b> vs 12 layers; <b>+1.74%</b> vs 4 layers.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/positional.png" alt="Fig. 2d · Four challenging subtyping tasks."><figcaption>Fig. 2d · Four challenging subtyping tasks.</figcaption></figure></div></div><div v-click="4"><p class="qualification">Relative gains reported in the Results text. Rounded chart labels use a different reference direction; do not reinterpret them as percentage points.</p></div>

<div class="source">Fig. 2d; Results: design ablations</div><div class="page-number">15</div>

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
class: titan figure-landscape
---

# Reports have the largest zero-shot effect

<div class="columns"><div><div class="point"><h2>Remove one pretraining stage at a time</h2><p>Compare mean balanced accuracy across four challenging subtyping tasks.</p></div><div v-click="2"><div class="point"><h2>Full model: 0.599</h2><p>Without ROI captions: <b>0.577</b>; without reports: <b>0.561</b>.</p></div></div><div v-click="3"><div class="point"><h2>Vision SSL changes this metric less</h2><p>Without stage 1: <b>0.598</b>. This does not erase its visual-transfer contribution.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/ablation-stages.png" alt="Fig. 3c · Stage removal changes zero-shot performance."><figcaption>Fig. 3c · Stage removal changes zero-shot performance.</figcaption></figure></div></div><div v-click="4"><p class="qualification">Printed changes: −0.4%, −3.6%, −7.3% against TITAN; retain the figure’s rounded values. MH-ABMIL: 0.588 (−1.9%).</p></div>

<div class="source">Fig. 3c; Results: language-aligned TITAN</div><div class="page-number">16</div>

<!--
No temperature or loss-weight sensitivity sweeps are established in the supplied PDF. Supplementary Tables 110–113 are cited for stage ablations.

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
class: titan 
---

# One report example shows diagnostic agreement

<div class="point"><h2>Cervical squamous carcinoma</h2><p>TITAN agrees with the reported diagnosis in this selected example.</p></div><figure v-click="1" class="wide-figure"><img src="/figures/report-cervix.png" alt="Fig. 3e · TCGA-C5-A3HL: slide, clinical report, TITAN, and PRISM."><figcaption>Fig. 3e · TCGA-C5-A3HL: slide, clinical report, TITAN, and PRISM.</figcaption></figure><div v-click="2"><div class="comparison"><div><h2>Clinical report</h2><p>Poorly differentiated squamous carcinoma</p></div><div><h2>TITAN</h2><p>Cervical squamous carcinoma</p></div><div><h2>PRISM</h2><p>High-grade serous carcinoma; organ unspecified</p></div></div></div><div v-click="3"><p class="qualification">Diagnostic summaries are paraphrased. Author-selected success; not an exhaustive error analysis or clinical validation.</p></div>

<div class="source">Fig. 3e; report-generation results</div><div class="page-number">17</div>

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
class: titan 
---

# Attention heads emphasize different tissue

<div class="point"><h2>Different heads attend to distinct morphology</h2><p>The authors identify tumor, stroma, and nontumor patterns.</p></div><figure v-click="1" class="wide-figure"><img src="/figures/attention.png" alt="Extended Data Fig. 5 · Thymoma: whole slide and heads 4, 10, 11."><figcaption>Extended Data Fig. 5 · Thymoma: whole slide and heads 4, 10, 11.</figcaption></figure><div v-click="2"><div class="comparison"><div><h2>Most heads</h2><p>Dense tumor</p></div><div><h2>Head 10</h2><p>Tumor-adjacent stroma</p></div><div><h2>Head 11</h2><p>Nontumor / tissue-specific morphology</p></div></div></div><div v-click="3"><p class="qualification">Visual self-attention is descriptive evidence; cross-modal attention maps were not reported.</p></div>

<div class="source">Results; Extended Data Fig. 5</div><div class="page-number">18</div>

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
class: titan 
---

# Retrieval follows morphological similarity

<div class="point"><h2>A paraganglioma query finds related tissue</h2><p>The highest displayed similarity is another paraganglioma.</p></div><figure v-click="1" class="wide-figure"><img src="/figures/retrieval-example.png" alt="Fig. 4b · Query and four representative retrieved slides."><figcaption>Fig. 4b · Query and four representative retrieved slides.</figcaption></figure><div v-click="2"><div class="similarities"><span><b>0.794</b> Paraganglioma</span><span><b>0.651</b> Pheochromocytoma</span><span><b>0.341</b> Hemangioma</span><span><b>0.212</b> Leiomyosarcoma</span></div></div><div v-click="3"><p class="qualification">Cosine similarities for a selected case. These four examples are not a complete ranked-result or failure analysis.</p></div>

<div class="source">Fig. 4b; Extended Data Fig. 8</div><div class="page-number">19</div>

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
class: titan figure-parameters
---

# A compact slide encoder is promising

<div class="columns"><div><div class="point"><h2>48.5 million slide-encoder parameters</h2><p>TITANᵥ: 42.1M; GigaPath: 86.3M; PRISM: 99.0M.</p></div><div v-click="2"><div class="point"><h2>Reduce sequence length</h2><p>512² instead of 256²-pixel patches gives <b>4× fewer tokens</b> for the same area.</p></div></div><div v-click="3"><div class="point"><h2>Runtime still needs measurement</h2><p>Parameter counts alone do not establish latency or throughput.</p></div></div></div><div><figure v-click="1" class=""><img src="/figures/params.png" alt="Fig. 2b · Aggregate balanced accuracy vs slide-encoder size."><figcaption>Fig. 2b · Aggregate balanced accuracy vs slide-encoder size.</figcaption></figure></div></div><p class="qualification">Slide-encoder counts exclude the full patch-plus-language system. Latency, GPU-hours, FLOPs, and comparative peak memory are not reported in the supplied PDF.</p>

<div class="source">Fig. 2b; Results; Methods</div><div class="page-number">20</div>

<!--


Source detail retained from original topic (for presenter reference):
# 12 · Computational efficiency and reporting boundaries




## Reported slide-encoder parameter counts

| Encoder | Parameters |
|---|---:|
| TITAN$_V$ | 42.1 million |
| TITAN | 48.5 million |
| GigaPath | 86.3 million |
| PRISM | 99.0 million |

Counts follow the paper’s slide-encoder comparison; not total end-to-end patch-plus-language system counts.

## Efficiency mechanisms described by the authors

| Mechanism | Computational role |
|---|---|
| Pre-extracted patch embeddings | Train all TITAN stages in feature space |
| $512^2$ vs $256^2$-pixel patches | Fourfold reduction in sequence length |
| Regional SSL and ALiBi | Train with limited context; extrapolate at inference |
| Feature-space augmentation | Avoid repeated pixel-view feature extraction |
| ROI captions before reports | Larger contrastive batches with detailed language |
| Stage 3 $64\times64$ feature crops | Broad context with larger batches |




## 🎨 Visual/Data Support



Figure 2b · Performance versus encoder parameters

### Not reported in the supplied PDF

| Measurement | Availability |
|---|---|
| Inference latency | Not reported |
| End-to-end feature extraction latency | Not reported |
| Training GPU-hours | Not reported |
| FLOPs / formal complexity | Not reported |
| Peak memory vs baselines | Not reported |

No latency or throughput speedup inferred from parameter counts.
-->

---
layout: default
class: titan figure-embeddings
---

# Site mixing does not prove robustness

<div class="point"><h2>TITAN embeddings mix submission sites</h2><p>Biological organization remains visible in the same TCGA-OT cohort.</p></div><div class="embedding-panels"><figure v-click="1" class=""><img src="/figures/embedding-tumor.png" alt="Tumor type · OncoTreeCode"><figcaption>Tumor type · OncoTreeCode</figcaption></figure><figure v-click="2" class=""><img src="/figures/embedding-organ.png" alt="Organ · OncoTreeSiteCode"><figcaption>Organ · OncoTreeSiteCode</figcaption></figure><figure v-click="3" class=""><img src="/figures/embedding-site.png" alt="Submission site"><figcaption>Submission site</figcaption></figure></div><div v-click="4"><p class="qualification">Extended Data Fig. 4: TITAN column, n = 11,186. Site mixing is observational; scanner and processing signals remain an author-stated concern. CHIEF includes TCGA in pretraining.</p></div>

<div class="source">Extended Data Fig. 4; Discussion pp. 3757–3758</div><div class="page-number">21</div>

<!--
Other limitations: regional training may miss full context; reports require manual tuning; Mass-340K is smaller than other corpora. Fine-tuning can overfit OT108, whose classes have 4–42 samples. Clinical-workflow benefits remain prospective.

Source detail retained from original topic (for presenter reference):
# 13 · Stated limitations and unresolved cases




| Author-stated limitation | Consequence / unresolved issue | Proposed response |
|---|---|---|
| Regional pretraining context | ALiBi extrapolation may miss full WSI context | Other extrapolation encodings |
| Nonbiological features | Scanner and processing-site signals may compromise translation | Robustness studies; larger multi-institutional data |
| Clinical-report processing | Morphology-linked alignment requires substantial manual tuning | Separate morphology and molecular characteristics |
| Limited pretraining scale | Mass-340K smaller than several other corpora | Expand the dataset |
| Small OT108 class populations | Fine-tuning may overfit; authors’ possible explanation | Recognize cohort-size dependence |

## Evaluation qualifications

- TCGA embedding analysis shows good submission-site mixing
- Authors still caution about nonbiological feature encoding
- Fine-tuning generally helps, with OT108 an exception
- Clinical workflow benefits remain prospective in the Discussion




## 🎨 Visual/Data Support



Extended Data Figure 4 · Clustering by biological and site labels

Limitations: Discussion, pp. 3757–3758. OT108 fine-tuning exception: Results and Extended Data Figure 6.
-->

---
layout: default
class: titan 
---

# Context and language improve transfer

<div class="flow"><div class="node" ><span class="step">01</span><h2>Visual context</h2><p>Feature-space SSL and spatial attention learn reusable slide embeddings.</p></div><div class="node" v-click="1"><span class="step">02</span><h2>Complementary language</h2><p>ROI captions add morphology; reports add diagnostic context.</p></div><div class="node" v-click="2"><span class="step">03</span><h2>Broad evaluation</h2><p>Benefits span probing, zero-shot tasks, and retrieval.</p></div></div><div v-click="3"><div class="future"><h2>Future directions proposed by the authors</h2><p><b>Scale:</b> more slides, captions, and model capacity<br><b>Representation:</b> better patch features, positional encodings, and report structure<br><b>Translation:</b> robustness and additional pathology domains</p></div></div><div v-click="4"><p class="qualification">Cross-domain applications and routine clinical use are proposed directions, not demonstrated outcomes.</p></div>

<div class="source">Discussion; Figs. 2–4</div><div class="page-number">22</div>

<!--


Source detail retained from original topic (for presenter reference):
# 14 · Conclusions and author-stated future directions




## Supported conclusions

- Feature-space iBOT learns transferable contextual slide embeddings
- 2D ALiBi supports regional training and longer-context deployment
- ROI captions and clinical reports supply complementary supervision
- Frozen embeddings support multiple limited-data applications
- Task-specific fine-tuning can help when sufficient cohort data exist

## Directions explicitly proposed in the Discussion

| Direction | Intended development |
|---|---|
| Expand Mass-340K | Scale slide pretraining |
| Generate more regional captions | Increase detailed language supervision |
| Additional data with heavier models | Investigate architecture and data scaling |
| Better patch representations | Improve downstream slide encoding |
| Alternative positional encodings | Improve whole-slide context coverage |
| Restructure clinical reports | Improve morphology/molecular alignment |
| Other pathology domains | Hematopathology, spatial transcriptomics, 3D pathology, multiplex imaging |

Cross-domain transfer and routine practitioner use are proposed future directions, not demonstrated outcomes.




## 🎨 Visual/Data Support



Figure 2a · Performance and pretraining-data scale

Figure 1e · Organ-colored TCGA embedding space
-->

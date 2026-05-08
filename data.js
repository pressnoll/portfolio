const PROJECTS = [
  {
    id: "neurofocus",
    name: "NeuroFocus",
    category: "Computer Vision",
    blurb: "Real-time focus and distraction detection app using YOLOv8 + MediaPipe with session logging.",
    stack: ["YOLOv8", "MediaPipe", "OpenCV", "Python", "State Machines"],
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll/neurofocus",

    role: "Designed the detection loop, session logic, warning states, and analytics logging.",
    problem:
      "Deep work breaks down when distractions are invisible until they have already stolen attention. NeuroFocus explores how computer vision can make focus state measurable without requiring manual tracking.",
    approach:
      "The system combines object detection for phone usage, facial landmark tracking for gaze changes, inactivity signals, and mode-based thresholds. A state machine turns raw signals into user-facing states such as focused, distracted, away, break mode, or lock intervention.",
    features: [
      "YOLO-based phone detection from webcam frames",
      "MediaPipe FaceMesh gaze and attention estimation",
      "Deep Work, Balanced, and Casual operating modes",
      "Hotkeys, warnings, lock flow, break mode, and recalibration",
      "CSV session logging for later focus analytics",
    ],
    techniques: ["Object detection", "Facial landmarks", "Calibration", "Thresholding", "Behavior logging"],
    outcome:
      "A product-style computer vision application that shows applied AI beyond notebooks: live inference, interaction logic, and usable feedback loops.",
    honestNote:
      "Evaluation metrics and public demo assets are not yet documented, so the next portfolio improvement is to add a short demo video and sample session chart.",
  },
  {
    id: "x-auto",
    name: "X_auto",
    category: "LLM Automation",
    blurb: "Autonomous agent that researches, generates tweet threads, and schedules publishing.",
    stack: ["Groq", "Llama 3.1", "Python", "APIs", "Scheduling"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll/X_auto",
    metric: "End-to-end agent",
    role: "Built the generation pipeline, JSON prompting flow, scheduling logic, and API orchestration.",
    problem:
      "Consistent content creation is repetitive: research, extract useful points, format a thread, attach media, and schedule. X_auto turns that workflow into an autonomous LLM pipeline.",
    approach:
      "The pipeline gathers research context and trend information, asks Groq Llama 3.1 for a strict JSON thread, validates/parses the output, optionally handles media, and passes the result into scheduling/posting modules.",
    features: [
      "Research-to-thread automation flow",
      "Strict JSON output generation from the LLM",
      "Retry handling around generation",
      "Optional media download and attachment",
      "Scheduled posting workflow",
    ],
    techniques: ["Prompt engineering", "Structured generation", "JSON parsing", "API integration", "Task scheduling"],
    outcome:
      "A practical LLM automation project showing agent-like orchestration, not just chat completion usage.",
    honestNote:
      "Public quality metrics are not documented yet, so the next step is adding example generated threads and before/after prompt comparisons.",
  },
  {
    id: "climate-forecasting",
    name: "Climate Scenario Forecasting Engine",
    category: "Deep Learning",
    blurb: "Time-series forecasting research using synthetic climate data, LSTM, Transformer, and GAN components.",
    stack: ["PyTorch", "LSTM", "Transformer", "GAN", "Time Series"],
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll/Climate-model-eval-",
    metric: "Sequence modeling",
    role: "Implemented synthetic data generation, model experiments, and training workflows.",
    problem:
      "Climate variables shift over time and interact in nonlinear ways. This project explores forecasting scenarios with multiple sequence-modeling approaches.",
    approach:
      "The notebooks generate synthetic multi-variable climate time series, train GAN-style components for synthetic sample generation, and compare forecasting architectures including LSTM and Transformer encoders.",
    features: [
      "Synthetic climate time-series generation",
      "GAN generator and discriminator training loop",
      "Sequence windows for forecasting",
      "LSTM and Transformer model definitions",
      "Validation monitoring and early stopping patterns",
    ],
    techniques: ["Time-series windowing", "GAN training", "LSTM forecasting", "Transformer encoders", "PyTorch loops"],
    outcome:
      "A research-oriented ML project showing comfort with custom deep-learning architectures and temporal modeling.",
    honestNote:
      "The repository needs cleanup and clearer final metrics before it should be presented as a fully polished production project.",
  },
  {
    id: "agricultural-ai",
    name: "Agricultural AI Pipeline",
    category: "Computer Vision",
    blurb: "YOLOv12 pipeline for tomato leaf disease detection from raw agricultural imagery.",
    stack: ["YOLOv12", "OpenCV", "Python", "Agriculture AI"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll/Tomato-disease-",
    metric: "Disease detection",
    role: "Prepared the model direction and training pipeline for crop disease classification.",
    problem:
      "Crop disease can spread quickly when early visual symptoms are missed. A detection pipeline can help surface likely tomato leaf diseases from raw imagery.",
    approach:
      "The project uses a YOLOv12-based computer vision pipeline to detect and classify tomato leaf disease indicators, with the goal of supporting faster agricultural triage.",
    features: [
      "Raw agricultural image processing",
      "YOLOv12 model training direction",
      "Tomato leaf disease detection target",
      "Computer vision workflow for field imagery",
    ],
    techniques: ["Object detection", "Image preprocessing", "Dataset preparation", "Model training"],
    outcome:
      "A domain-specific AI project that connects computer vision skills to agriculture and real-world decision support.",
    honestNote:
      "The public repository link needs to be connected once the project is cleaned and available.",
  },
  {
    id: "pubmed-classifier",
    name: "PubMed Abstract Classifier",
    category: "NLP",
    blurb: "Custom tribrid embedding model combining token, character, and positional encodings.",
    stack: ["TensorFlow", "NLP", "Embeddings", "Medical AI"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll",
    metric: "Tribrid model",
    role: "Architected the embedding strategy and classification model direction.",
    problem:
      "Medical abstracts are structured, dense, and context-sensitive. Classifying sections accurately requires more than simple word-level representations.",
    approach:
      "The model combines token embeddings, character-level representations, and positional encodings so the classifier can reason about meaning, word structure, and abstract section order together.",
    features: [
      "Token-level semantic representation",
      "Character-level morphology signal",
      "Positional encoding for abstract structure",
      "Medical abstract section classification",
    ],
    techniques: ["NLP classification", "Hybrid embeddings", "TensorFlow modeling", "Sequence representation"],
    outcome:
      "A strong NLP architecture project showing model design thinking instead of only using an off-the-shelf classifier.",
    honestNote:
      "The portfolio should eventually include exact dataset information, validation score, and a confusion matrix.",
  },
  {
    id: "food-vision-big",
    name: "Food Vision Big",
    category: "Deep Learning",
    blurb: "Food101 transfer-learning workflow with EfficientNetB0 and tf.data performance pipeline.",
    stack: ["TensorFlow", "EfficientNetB0", "TFDS", "Transfer Learning"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/pressnoll/tensorflor_ml_projects",
    metric: "72.5% test accuracy",
    role: "Built the data pipeline, transfer-learning model, checkpoints, and evaluation flow.",
    problem:
      "Food image classification at 101 categories requires scalable data loading, a strong visual backbone, and a repeatable training workflow.",
    approach:
      "The notebook uses TensorFlow Datasets for Food101, preprocesses images to 224x224, builds an optimized tf.data pipeline, trains an EfficientNetB0 feature extractor, then saves and reloads the model to verify persistence.",
    features: [
      "Food101 loading with TFDS metadata",
      "Image preprocessing and batching",
      "tf.data shuffle, batch, prefetch, and AUTOTUNE",
      "EfficientNetB0 transfer learning",
      "Checkpointing, saving, loading, and evaluation",
    ],
    techniques: ["Transfer learning", "Image classification", "tf.data optimization", "Model persistence"],
    outcome:
      "Reached approximately 72.5% test accuracy and demonstrates a complete deep-learning workflow with real evaluation output.",
    honestNote:
      "This belongs as a strong learning-to-applied bridge: polished enough to show, but not the main hero above NeuroFocus or X_auto.",
  },
];

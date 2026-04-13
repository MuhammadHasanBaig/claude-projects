/* ============================================================
   MEDICONNECT - Complete Application Logic
   ============================================================ */

'use strict';

/* ============================================================
   STATE
   ============================================================ */
let currentUser = JSON.parse(localStorage.getItem('mc_user')) || null;
let appointments = JSON.parse(localStorage.getItem('mc_appointments')) || [];
let currentPage = 'home';
let bookingState = {
  doctorId: null,
  selectedDate: null,
  selectedTime: null,
  step: 1,
  calYear: null,
  calMonth: null
};

/* ============================================================
   DUMMY DOCTORS DATA (24 doctors)
   ============================================================ */
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah',
    photo: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4F46E5&color=fff&size=200',
    specialization: 'Cardiology',
    diseases_treated: ['Heart Disease', 'Hypertension', 'Arrhythmia', 'Coronary Artery Disease', 'Heart Failure'],
    location: 'New York',
    rating: 4.9,
    reviews_count: 312,
    experience_years: 18,
    fee: 250,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    bio: 'Dr. Sarah Mitchell is a board-certified cardiologist with over 18 years of experience in diagnosing and treating complex cardiovascular conditions. She completed her fellowship at Johns Hopkins Hospital and has published over 40 peer-reviewed articles. She is passionate about preventive cardiology and patient education.',
    education: ['MD - Harvard Medical School', 'Fellowship in Cardiology - Johns Hopkins Hospital', 'Board Certified - American Board of Internal Medicine'],
    hospital: 'New York Presbyterian Hospital'
  },
  {
    id: 2,
    name: 'Dr. James Thornton',
    photo: 'https://ui-avatars.com/api/?name=James+Thornton&background=06B6D4&color=fff&size=200',
    specialization: 'Neurology',
    diseases_treated: ['Migraines', 'Epilepsy', 'Stroke', 'Parkinson\'s Disease', 'Multiple Sclerosis'],
    location: 'Los Angeles',
    rating: 4.8,
    reviews_count: 278,
    experience_years: 15,
    fee: 280,
    availability: ['Monday', 'Wednesday', 'Friday'],
    bio: 'Dr. James Thornton is a renowned neurologist specializing in movement disorders and epilepsy. He trained at the Mayo Clinic and has led clinical trials for cutting-edge neurological treatments. His patient-centered approach has earned him recognition as one of America\'s top neurologists.',
    education: ['MD - Stanford University School of Medicine', 'Residency in Neurology - Mayo Clinic', 'Fellowship in Epilepsy - UCSF Medical Center'],
    hospital: 'Cedars-Sinai Medical Center'
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    photo: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10B981&color=fff&size=200',
    specialization: 'Dermatology',
    diseases_treated: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer Screening', 'Rosacea', 'Hair Loss'],
    location: 'Chicago',
    rating: 4.7,
    reviews_count: 195,
    experience_years: 12,
    fee: 200,
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    bio: 'Dr. Priya Sharma is a highly skilled dermatologist with expertise in both medical and cosmetic dermatology. She completed advanced training in dermatopathology and is known for her holistic approach to skin health. She was recognized by Chicago Magazine as a Top Dermatologist for five consecutive years.',
    education: ['MD - University of Chicago Pritzker School of Medicine', 'Residency in Dermatology - Northwestern Memorial Hospital', 'Fellowship in Dermatopathology - Mayo Clinic'],
    hospital: 'Northwestern Memorial Hospital'
  },
  {
    id: 4,
    name: 'Dr. Robert Chen',
    photo: 'https://ui-avatars.com/api/?name=Robert+Chen&background=F59E0B&color=fff&size=200',
    specialization: 'Orthopedics',
    diseases_treated: ['Bone Fractures', 'Joint Pain', 'Arthritis', 'Sports Injuries', 'Spinal Disorders', 'Knee Replacement'],
    location: 'Houston',
    rating: 4.9,
    reviews_count: 445,
    experience_years: 20,
    fee: 300,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    bio: 'Dr. Robert Chen is a leading orthopedic surgeon specializing in joint reconstruction and sports medicine. He has performed over 3,000 successful joint replacement surgeries and is the team physician for several professional sports teams in Houston. His minimally invasive surgical techniques minimize recovery time.',
    education: ['MD - Baylor College of Medicine', 'Residency in Orthopedic Surgery - Houston Methodist Hospital', 'Fellowship in Sports Medicine - Hospital for Special Surgery, NY'],
    hospital: 'Houston Methodist Hospital'
  },
  {
    id: 5,
    name: 'Dr. Emily Rodriguez',
    photo: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=EF4444&color=fff&size=200',
    specialization: 'Pediatrics',
    diseases_treated: ['Child Health', 'Fever', 'Vaccinations', 'Developmental Disorders', 'Asthma', 'Childhood Obesity'],
    location: 'Phoenix',
    rating: 4.8,
    reviews_count: 523,
    experience_years: 14,
    fee: 180,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to the health and wellbeing of children from newborns to teenagers. She completed specialized training in developmental pediatrics and is fluent in Spanish, allowing her to serve a diverse patient population across Phoenix.',
    education: ['MD - University of Arizona College of Medicine', 'Residency in Pediatrics - Phoenix Children\'s Hospital', 'Board Certified - American Board of Pediatrics'],
    hospital: 'Phoenix Children\'s Hospital'
  },
  {
    id: 6,
    name: 'Dr. Lisa Nakamura',
    photo: 'https://ui-avatars.com/api/?name=Lisa+Nakamura&background=8B5CF6&color=fff&size=200',
    specialization: 'Gynecology',
    diseases_treated: ['Women\'s Health', 'Pregnancy', 'PCOS', 'Endometriosis', 'Menstrual Disorders', 'Menopause'],
    location: 'Philadelphia',
    rating: 4.9,
    reviews_count: 387,
    experience_years: 16,
    fee: 220,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Dr. Lisa Nakamura is an experienced OB/GYN with a special focus on high-risk pregnancies and minimally invasive gynecologic surgery. She has helped thousands of women navigate complex reproductive health challenges and is known for her warm, empathetic care style.',
    education: ['MD - Jefferson Medical College', 'Residency in Obstetrics & Gynecology - Pennsylvania Hospital', 'Fellowship in Maternal-Fetal Medicine - CHOP'],
    hospital: 'Jefferson University Hospital'
  },
  {
    id: 7,
    name: 'Dr. Marcus Johnson',
    photo: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=3B82F6&color=fff&size=200',
    specialization: 'Ophthalmology',
    diseases_treated: ['Glaucoma', 'Cataracts', 'Diabetic Retinopathy', 'Macular Degeneration', 'Dry Eye Syndrome', 'LASIK Consultation'],
    location: 'San Antonio',
    rating: 4.7,
    reviews_count: 234,
    experience_years: 17,
    fee: 240,
    availability: ['Tuesday', 'Wednesday', 'Thursday'],
    bio: 'Dr. Marcus Johnson is a board-certified ophthalmologist specializing in comprehensive eye care and laser vision correction. He has performed over 5,000 LASIK procedures and is a pioneer in minimally invasive glaucoma surgery techniques at University Health in San Antonio.',
    education: ['MD - UT Health San Antonio', 'Residency in Ophthalmology - Wilmer Eye Institute', 'Fellowship in Glaucoma - Bascom Palmer Eye Institute'],
    hospital: 'University Health San Antonio'
  },
  {
    id: 8,
    name: 'Dr. Aisha Patel',
    photo: 'https://ui-avatars.com/api/?name=Aisha+Patel&background=EC4899&color=fff&size=200',
    specialization: 'ENT',
    diseases_treated: ['Ear Infections', 'Sinus Problems', 'Hearing Loss', 'Tonsillitis', 'Sleep Apnea', 'Allergic Rhinitis'],
    location: 'San Diego',
    rating: 4.8,
    reviews_count: 291,
    experience_years: 11,
    fee: 210,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    bio: 'Dr. Aisha Patel is an ENT specialist with expertise in endoscopic sinus surgery and otology. She brings a thorough, compassionate approach to evaluating and treating ear, nose, and throat conditions in patients of all ages. She is fluent in Hindi and Gujarati.',
    education: ['MD - UC San Diego School of Medicine', 'Residency in Otolaryngology - UCSD Medical Center', 'Fellowship in Rhinology - Cleveland Clinic'],
    hospital: 'UC San Diego Health'
  },
  {
    id: 9,
    name: 'Dr. David Park',
    photo: 'https://ui-avatars.com/api/?name=David+Park&background=0F172A&color=fff&size=200',
    specialization: 'Psychiatry',
    diseases_treated: ['Depression', 'Anxiety', 'PTSD', 'Bipolar Disorder', 'OCD', 'Schizophrenia', 'Addiction'],
    location: 'Dallas',
    rating: 4.9,
    reviews_count: 178,
    experience_years: 13,
    fee: 260,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Dr. David Park is a compassionate psychiatrist who specializes in mood disorders and trauma. He integrates evidence-based psychotherapy with medication management to provide comprehensive mental health care. He is a strong advocate for mental health awareness and reducing stigma.',
    education: ['MD - UT Southwestern Medical Center', 'Residency in Psychiatry - Parkland Memorial Hospital', 'Fellowship in Psychopharmacology - UT Southwestern'],
    hospital: 'UT Southwestern Medical Center'
  },
  {
    id: 10,
    name: 'Dr. Helen Foster',
    photo: 'https://ui-avatars.com/api/?name=Helen+Foster&background=059669&color=fff&size=200',
    specialization: 'General Medicine',
    diseases_treated: ['Diabetes', 'Flu', 'General Checkup', 'Hypertension', 'Obesity', 'Thyroid Disorders'],
    location: 'Austin',
    rating: 4.6,
    reviews_count: 612,
    experience_years: 22,
    fee: 150,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Dr. Helen Foster is a highly experienced general practitioner who provides comprehensive primary care services. With over 22 years in practice, she has built long-lasting relationships with her patients and is committed to preventive medicine and chronic disease management.',
    education: ['MD - University of Texas Medical Branch', 'Residency in Internal Medicine - Seton Medical Center Austin', 'Board Certified - American Board of Internal Medicine'],
    hospital: 'Ascension Seton Medical Center'
  },
  {
    id: 11,
    name: 'Dr. Nathan Williams',
    photo: 'https://ui-avatars.com/api/?name=Nathan+Williams&background=7C3AED&color=fff&size=200',
    specialization: 'Oncology',
    diseases_treated: ['Breast Cancer', 'Lung Cancer', 'Colon Cancer', 'Leukemia', 'Lymphoma', 'Chemotherapy'],
    location: 'New York',
    rating: 4.9,
    reviews_count: 203,
    experience_years: 19,
    fee: 350,
    availability: ['Monday', 'Wednesday', 'Friday'],
    bio: 'Dr. Nathan Williams is a leading medical oncologist specializing in solid tumors and hematologic malignancies. He has been at the forefront of precision oncology and immunotherapy research, offering patients access to the latest clinical trials and targeted therapies at Memorial Sloan Kettering.',
    education: ['MD - Columbia University Vagelos College of P&S', 'Residency in Internal Medicine - New York-Presbyterian', 'Fellowship in Medical Oncology - Memorial Sloan Kettering'],
    hospital: 'Memorial Sloan Kettering Cancer Center'
  },
  {
    id: 12,
    name: 'Dr. Sofia Garcia',
    photo: 'https://ui-avatars.com/api/?name=Sofia+Garcia&background=D97706&color=fff&size=200',
    specialization: 'Endocrinology',
    diseases_treated: ['Thyroid Disorders', 'Diabetes Management', 'Osteoporosis', 'Adrenal Disorders', 'Pituitary Disorders', 'Hormonal Imbalances'],
    location: 'Los Angeles',
    rating: 4.8,
    reviews_count: 267,
    experience_years: 14,
    fee: 270,
    availability: ['Tuesday', 'Thursday', 'Friday'],
    bio: 'Dr. Sofia Garcia is a dedicated endocrinologist specializing in thyroid disease and comprehensive diabetes care. She takes a personalized approach to hormonal health, using cutting-edge diagnostics to optimize patient outcomes. She is bilingual in English and Spanish.',
    education: ['MD - UCLA David Geffen School of Medicine', 'Residency in Internal Medicine - UCLA Medical Center', 'Fellowship in Endocrinology - Cedars-Sinai'],
    hospital: 'UCLA Medical Center'
  },
  {
    id: 13,
    name: 'Dr. Benjamin Scott',
    photo: 'https://ui-avatars.com/api/?name=Benjamin+Scott&background=2563EB&color=fff&size=200',
    specialization: 'Cardiology',
    diseases_treated: ['Heart Attack', 'Atrial Fibrillation', 'Valve Disease', 'Pericarditis', 'Heart Failure', 'Cholesterol Management'],
    location: 'Chicago',
    rating: 4.7,
    reviews_count: 198,
    experience_years: 16,
    fee: 260,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    bio: 'Dr. Benjamin Scott is an interventional cardiologist with expertise in complex cardiac catheterization and structural heart procedures. He has pioneered the use of robotic-assisted cardiac surgery at Northwestern and is a sought-after speaker at international cardiology conferences.',
    education: ['MD - Northwestern Feinberg School of Medicine', 'Residency in Internal Medicine - Northwestern Memorial', 'Fellowship in Interventional Cardiology - Cleveland Clinic'],
    hospital: 'Northwestern Memorial Hospital'
  },
  {
    id: 14,
    name: 'Dr. Rachel Green',
    photo: 'https://ui-avatars.com/api/?name=Rachel+Green&background=0891B2&color=fff&size=200',
    specialization: 'Dermatology',
    diseases_treated: ['Melanoma', 'Vitiligo', 'Urticaria', 'Contact Dermatitis', 'Nail Disorders', 'Pediatric Dermatology'],
    location: 'Houston',
    rating: 4.6,
    reviews_count: 142,
    experience_years: 9,
    fee: 190,
    availability: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    bio: 'Dr. Rachel Green is a rising star in dermatology, known for her exceptional diagnostic skills and commitment to evidence-based care. She completed specialized training in melanoma surgery and offers comprehensive services from medical to cosmetic dermatology.',
    education: ['MD - Baylor College of Medicine', 'Residency in Dermatology - MD Anderson Cancer Center', 'Fellow - American Academy of Dermatology'],
    hospital: 'MD Anderson Cancer Center'
  },
  {
    id: 15,
    name: 'Dr. Carlos Mendez',
    photo: 'https://ui-avatars.com/api/?name=Carlos+Mendez&background=16A34A&color=fff&size=200',
    specialization: 'Orthopedics',
    diseases_treated: ['Spine Surgery', 'Hip Replacement', 'Rotator Cuff', 'ACL Reconstruction', 'Foot & Ankle Disorders'],
    location: 'Phoenix',
    rating: 4.8,
    reviews_count: 356,
    experience_years: 21,
    fee: 290,
    availability: ['Monday', 'Wednesday', 'Friday'],
    bio: 'Dr. Carlos Mendez is a highly decorated orthopedic surgeon with two decades of experience in joint preservation and reconstruction. He pioneered a novel minimally invasive hip replacement technique that has been adopted by surgeons internationally. He is bilingual in English and Spanish.',
    education: ['MD - University of Arizona College of Medicine', 'Residency in Orthopedics - Mayo Clinic Arizona', 'Fellowship in Joint Reconstruction - Hospital for Special Surgery'],
    hospital: 'Banner University Medical Center Phoenix'
  },
  {
    id: 16,
    name: 'Dr. Olivia Thompson',
    photo: 'https://ui-avatars.com/api/?name=Olivia+Thompson&background=BE185D&color=fff&size=200',
    specialization: 'Pediatrics',
    diseases_treated: ['Neonatology', 'Pediatric Nutrition', 'Growth Disorders', 'Autism Spectrum', 'ADHD', 'Childhood Allergies'],
    location: 'Philadelphia',
    rating: 4.9,
    reviews_count: 489,
    experience_years: 17,
    fee: 170,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    bio: 'Dr. Olivia Thompson is a board-certified pediatrician with a subspecialty in developmental and behavioral pediatrics. She takes a holistic approach to child health, addressing physical, emotional, and developmental needs. Patients\' families praise her exceptional communication skills.',
    education: ['MD - Perelman School of Medicine at Penn', 'Residency in Pediatrics - CHOP', 'Fellowship in Developmental Pediatrics - CHOP'],
    hospital: 'Children\'s Hospital of Philadelphia'
  },
  {
    id: 17,
    name: 'Dr. Michael Davis',
    photo: 'https://ui-avatars.com/api/?name=Michael+Davis&background=92400E&color=fff&size=200',
    specialization: 'Neurology',
    diseases_treated: ['Alzheimer\'s Disease', 'Dementia', 'Neuropathy', 'Headaches', 'Brain Tumors', 'ALS'],
    location: 'San Antonio',
    rating: 4.7,
    reviews_count: 167,
    experience_years: 24,
    fee: 295,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    bio: 'Dr. Michael Davis is a veteran neurologist with 24 years of experience in neurodegenerative diseases and cognitive disorders. He leads the Memory Disorders Clinic at UTHSCSA and has contributed significantly to Alzheimer\'s research. He is known for his compassionate care of dementia patients and their families.',
    education: ['MD - UT Health San Antonio', 'Residency in Neurology - University Hospital', 'Fellowship in Behavioral Neurology - UCSF'],
    hospital: 'UT Health San Antonio'
  },
  {
    id: 18,
    name: 'Dr. Fatima Al-Hassan',
    photo: 'https://ui-avatars.com/api/?name=Fatima+Al-Hassan&background=1D4ED8&color=fff&size=200',
    specialization: 'Gynecology',
    diseases_treated: ['Infertility', 'Uterine Fibroids', 'Ovarian Cysts', 'Cervical Dysplasia', 'Pelvic Pain', 'Contraception'],
    location: 'San Diego',
    rating: 4.8,
    reviews_count: 322,
    experience_years: 15,
    fee: 230,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Dr. Fatima Al-Hassan is a highly regarded OB/GYN with a special focus on reproductive medicine and minimally invasive surgery. She is an expert in robotic and laparoscopic procedures for complex gynecologic conditions. She speaks Arabic, French, and English, serving a diverse patient base.',
    education: ['MD - UC San Diego School of Medicine', 'Residency in OB/GYN - UC San Diego Health', 'Fellowship in Reproductive Endocrinology - Scripps Clinic'],
    hospital: 'Scripps Health'
  },
  {
    id: 19,
    name: 'Dr. Tyler Brooks',
    photo: 'https://ui-avatars.com/api/?name=Tyler+Brooks&background=065F46&color=fff&size=200',
    specialization: 'General Medicine',
    diseases_treated: ['Preventive Care', 'Blood Pressure', 'Cholesterol', 'Sleep Disorders', 'Fatigue', 'Infections'],
    location: 'Dallas',
    rating: 4.5,
    reviews_count: 734,
    experience_years: 11,
    fee: 140,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    bio: 'Dr. Tyler Brooks is a dedicated primary care physician committed to keeping his patients healthy through preventive medicine. He offers same-day appointments and provides continuity of care for chronic conditions. His approachable style makes patients feel comfortable discussing any health concern.',
    education: ['MD - UT Southwestern Medical Center', 'Residency in Family Medicine - Parkland Memorial Hospital', 'Board Certified - American Board of Family Medicine'],
    hospital: 'Texas Health Presbyterian Hospital Dallas'
  },
  {
    id: 20,
    name: 'Dr. Linda Kim',
    photo: 'https://ui-avatars.com/api/?name=Linda+Kim&background=7E22CE&color=fff&size=200',
    specialization: 'Psychiatry',
    diseases_treated: ['Panic Disorder', 'Social Anxiety', 'Insomnia', 'Eating Disorders', 'Grief', 'Relationship Issues'],
    location: 'Austin',
    rating: 4.9,
    reviews_count: 156,
    experience_years: 10,
    fee: 240,
    availability: ['Tuesday', 'Wednesday', 'Friday'],
    bio: 'Dr. Linda Kim is a compassionate psychiatrist specializing in anxiety disorders and women\'s mental health. She integrates mindfulness-based cognitive therapy with personalized medication management. She creates a safe, judgment-free environment for her patients to explore and address their mental health.',
    education: ['MD - University of Texas at Austin Dell Medical School', 'Residency in Psychiatry - Austin State Hospital', 'Certificate in Cognitive Behavioral Therapy - Beck Institute'],
    hospital: 'Ascension Seton Medical Center Austin'
  },
  {
    id: 21,
    name: 'Dr. Samuel Wright',
    photo: 'https://ui-avatars.com/api/?name=Samuel+Wright&background=B45309&color=fff&size=200',
    specialization: 'ENT',
    diseases_treated: ['Chronic Sinusitis', 'Nasal Polyps', 'Voice Disorders', 'Thyroid Nodules', 'Head & Neck Cancer', 'Vertigo'],
    location: 'New York',
    rating: 4.7,
    reviews_count: 245,
    experience_years: 19,
    fee: 225,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    bio: 'Dr. Samuel Wright is a distinguished otolaryngologist and head & neck surgeon at NYU Langone. He specializes in advanced endoscopic and robotic approaches for complex ENT and head/neck conditions. He has been listed in New York Magazine\'s Best Doctors for 7 consecutive years.',
    education: ['MD - NYU Grossman School of Medicine', 'Residency in Otolaryngology - NYU Langone', 'Fellowship in Head & Neck Surgery - MD Anderson Cancer Center'],
    hospital: 'NYU Langone Health'
  },
  {
    id: 22,
    name: 'Dr. Amy Chang',
    photo: 'https://ui-avatars.com/api/?name=Amy+Chang&background=0369A1&color=fff&size=200',
    specialization: 'Ophthalmology',
    diseases_treated: ['Retinal Diseases', 'Diabetic Eye Disease', 'Age-Related Macular Degeneration', 'Strabismus', 'Corneal Disorders'],
    location: 'Los Angeles',
    rating: 4.8,
    reviews_count: 198,
    experience_years: 13,
    fee: 235,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Dr. Amy Chang is a comprehensive ophthalmologist with a subspecialty focus on retinal diseases. She has extensive experience treating complex retinal conditions using the latest intravitreal injection therapies and laser treatments. She conducts research on novel approaches to macular degeneration.',
    education: ['MD - USC Keck School of Medicine', 'Residency in Ophthalmology - Jules Stein Eye Institute UCLA', 'Fellowship in Retina - Doheny Eye Institute'],
    hospital: 'USC Roski Eye Institute'
  },
  {
    id: 23,
    name: 'Dr. Gregory Palmer',
    photo: 'https://ui-avatars.com/api/?name=Gregory+Palmer&background=0C4A6E&color=fff&size=200',
    specialization: 'Oncology',
    diseases_treated: ['Prostate Cancer', 'Bladder Cancer', 'Kidney Cancer', 'Testicular Cancer', 'Radiation Therapy', 'Immunotherapy'],
    location: 'Chicago',
    rating: 4.9,
    reviews_count: 187,
    experience_years: 22,
    fee: 330,
    availability: ['Tuesday', 'Wednesday', 'Friday'],
    bio: 'Dr. Gregory Palmer is a top-ranked medical oncologist and hematologist specializing in genitourinary cancers. He has led over 50 clinical trials and was awarded the American Society of Clinical Oncology Distinguished Investigator Award. His multidisciplinary approach ensures comprehensive cancer care.',
    education: ['MD - University of Chicago Pritzker School of Medicine', 'Residency in Internal Medicine - University of Chicago', 'Fellowship in Medical Oncology - Memorial Sloan Kettering'],
    hospital: 'University of Chicago Medicine'
  },
  {
    id: 24,
    name: 'Dr. Jennifer Walsh',
    photo: 'https://ui-avatars.com/api/?name=Jennifer+Walsh&background=78350F&color=fff&size=200',
    specialization: 'Endocrinology',
    diseases_treated: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Hyperthyroidism', 'Hypothyroidism', 'Polycystic Ovarian Syndrome', 'Adrenal Insufficiency'],
    location: 'Houston',
    rating: 4.7,
    reviews_count: 223,
    experience_years: 16,
    fee: 255,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    bio: 'Dr. Jennifer Walsh is an endocrinologist dedicated to improving the lives of patients with diabetes and metabolic disorders. She uses the latest continuous glucose monitoring technology and insulin pump therapy to optimize glycemic control. She founded the Houston Diabetes Education Foundation.',
    education: ['MD - Baylor College of Medicine', 'Residency in Internal Medicine - Ben Taub General Hospital', 'Fellowship in Endocrinology & Metabolism - Houston Methodist'],
    hospital: 'Houston Methodist Hospital'
  }
];

/* ============================================================
   ROUTER
   ============================================================ */
const Router = {
  routes: {},
  register(page, fn) { this.routes[page] = fn; },
  navigate(page, params) {
    currentPage = page;
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.className = '';
    if (this.routes[page]) {
      this.routes[page](params);
    } else {
      renderHome();
    }
    updateNavLinks(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

function navigate(page, params) {
  Router.navigate(page, params);
}

function updateNavLinks(page) {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  const isLoggedIn = !!currentUser;
  const loginItem = document.getElementById('navLoginItem');
  const signupItem = document.getElementById('navSignupItem');
  const dashItem = document.getElementById('navDashboardItem');
  const logoutItem = document.getElementById('navLogoutItem');
  if (isLoggedIn) {
    if (loginItem) loginItem.classList.add('hidden');
    if (signupItem) signupItem.classList.add('hidden');
    if (dashItem) dashItem.classList.remove('hidden');
    if (logoutItem) logoutItem.classList.remove('hidden');
  } else {
    if (loginItem) loginItem.classList.remove('hidden');
    if (signupItem) signupItem.classList.remove('hidden');
    if (dashItem) dashItem.classList.add('hidden');
    if (logoutItem) logoutItem.classList.add('hidden');
  }
}

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function generateStarsHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
    else if (i === Math.ceil(rating) && rating % 1 >= 0.5) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDayName(dateStr) {
  if (!dateStr) return '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateStr).getDay()];
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function saveAppointments() {
  localStorage.setItem('mc_appointments', JSON.stringify(appointments));
}

function saveUser(user) {
  currentUser = user;
  if (user) localStorage.setItem('mc_user', JSON.stringify(user));
  else localStorage.removeItem('mc_user');
}

/* ============================================================
   TOAST NOTIFICATION SYSTEM
   ============================================================ */
function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toastContainer');
  const icons = { success: 'fa-check', error: 'fa-times', info: 'fa-info', warning: 'fa-exclamation' };
  const id = generateId();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.id = id;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${icons[type] || 'fa-bell'}"></i></div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="dismissToast('${id}')"><i class="fas fa-times"></i></button>
    <div class="toast-progress"></div>
  `;
  container.appendChild(toast);
  setTimeout(() => dismissToast(id), duration);
}

function dismissToast(id) {
  const toast = document.getElementById(id);
  if (!toast) return;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode', !isDark);
  syncThemeUI(isDark);
  localStorage.setItem('mc_theme', isDark ? 'dark' : 'light');
}

function syncThemeUI(isDark) {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

  const mobileIcon = document.getElementById('mobileThemeIcon');
  if (mobileIcon) mobileIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

  const mobileLabel = document.getElementById('mobileThemeLabel');
  if (mobileLabel) mobileLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function initTheme() {
  const saved = localStorage.getItem('mc_theme');
  const isDark = saved === 'dark';
  if (isDark) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  }
  syncThemeUI(isDark);
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
}

/* ============================================================
   SCROLL NAVBAR EFFECT
   ============================================================ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ============================================================
   AUTH FUNCTIONS
   ============================================================ */
function login(email, password) {
  const users = JSON.parse(localStorage.getItem('mc_users') || '[]');
  const demoUser = email === 'demo@mediconnect.com' && password === 'demo123';
  const found = users.find(u => u.email === email && u.password === password);
  if (found || demoUser) {
    const user = found || { id: 'demo', name: 'Demo Patient', email: 'demo@mediconnect.com', role: 'patient' };
    saveUser(user);
    updateNavLinks(currentPage);
    showToast('success', 'Welcome back!', `Logged in as ${user.name}`);
    navigate('dashboard');
    return true;
  }
  return false;
}

function signup(data) {
  const users = JSON.parse(localStorage.getItem('mc_users') || '[]');
  if (users.find(u => u.email === data.email)) return false;
  const user = { id: generateId(), ...data };
  users.push(user);
  localStorage.setItem('mc_users', JSON.stringify(users));
  saveUser(user);
  updateNavLinks(currentPage);
  showToast('success', 'Account Created!', `Welcome, ${user.name}! You can now log in with ${user.email}`);
  navigate('dashboard');
  return true;
}

function logout() {
  saveUser(null);
  updateNavLinks('home');
  showToast('info', 'Logged Out', 'You have been successfully logged out.');
  navigate('home');
}

/* ============================================================
   FILTER DOCTORS
   ============================================================ */
function filterDoctors({ search = '', location = '', date = '', minRating = 0, maxFee = 500, sort = 'rating' }) {
  let filtered = [...doctors];
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.specialization.toLowerCase().includes(q) ||
      d.diseases_treated.some(dis => dis.toLowerCase().includes(q)) ||
      d.hospital.toLowerCase().includes(q)
    );
  }
  if (location) {
    filtered = filtered.filter(d => d.location === location);
  }
  if (date) {
    const dayName = getDayName(date);
    filtered = filtered.filter(d => d.availability.includes(dayName));
  }
  if (minRating > 0) {
    filtered = filtered.filter(d => d.rating >= minRating);
  }
  filtered = filtered.filter(d => d.fee <= maxFee);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === 'fee_asc') filtered.sort((a, b) => a.fee - b.fee);
  else if (sort === 'fee_desc') filtered.sort((a, b) => b.fee - a.fee);
  else if (sort === 'experience') filtered.sort((a, b) => b.experience_years - a.experience_years);
  return filtered;
}

/* ============================================================
   BOOKING FUNCTIONS
   ============================================================ */
function bookAppointment(doctorId, date, time) {
  if (!currentUser) {
    showToast('warning', 'Login Required', 'Please login to book an appointment.');
    navigate('login');
    return false;
  }
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return false;
  const appointment = {
    id: generateId(),
    doctorId,
    doctorName: doctor.name,
    doctorPhoto: doctor.photo,
    doctorSpecialty: doctor.specialization,
    doctorHospital: doctor.hospital,
    doctorFee: doctor.fee,
    patientId: currentUser.id,
    date,
    time,
    status: 'upcoming',
    bookedAt: new Date().toISOString()
  };
  appointments.push(appointment);
  saveAppointments();
  showToast('success', 'Appointment Booked!', `Your appointment with ${doctor.name} on ${formatDateShort(date)} at ${time} is confirmed.`);
  return appointment;
}

function cancelAppointment(appointmentId) {
  const idx = appointments.findIndex(a => a.id === appointmentId);
  if (idx === -1) return false;
  appointments[idx].status = 'cancelled';
  saveAppointments();
  showToast('info', 'Appointment Cancelled', 'Your appointment has been cancelled successfully.');
  return true;
}

/* ============================================================
   HOME VIEW
   ============================================================ */
function renderHome() {
  const app = document.getElementById('app');
  const topDoctors = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 4);
  app.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg-circles">
        <div class="hero-circle"></div>
        <div class="hero-circle"></div>
        <div class="hero-circle"></div>
      </div>
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <i class="fas fa-shield-alt"></i>
            Trusted by 50,000+ Patients
          </div>
          <h1 class="hero-title">
            Your Health,<br><span>Expert Care,</span><br>One Click Away
          </h1>
          <p class="hero-subtitle">
            Connect with top-rated specialists across all medical fields. Book appointments instantly, get expert consultations, and take control of your health journey.
          </p>
          <div class="hero-search">
            <div class="hero-search-input">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Search doctors, specializations, diseases..." id="heroSearchInput" />
            </div>
            <div class="hero-search-divider"></div>
            <button class="hero-search-btn" onclick="heroSearch()">
              <i class="fas fa-search"></i> Find Doctors
            </button>
          </div>
          <div class="hero-actions" style="margin-top: 20px;">
            <button class="btn-hero-primary" onclick="navigate('doctors')">
              <i class="fas fa-user-md"></i> Browse All Doctors
            </button>
            <button class="btn-hero-secondary" onclick="navigate('signup')">
              <i class="fas fa-user-plus"></i> Create Free Account
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-illustration">
            <div class="hero-card-header">
              <img src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4F46E5&color=fff&size=200" alt="Doctor" class="hero-card-avatar" />
              <div class="hero-card-info">
                <h3>Dr. Sarah Mitchell</h3>
                <p>Cardiologist · New York</p>
              </div>
            </div>
            <div class="hero-card-stats">
              <div class="hero-stat">
                <span class="hero-stat-value">4.9</span>
                <span class="hero-stat-label">Rating</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-value">18+</span>
                <span class="hero-stat-label">Years Exp.</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-value">312</span>
                <span class="hero-stat-label">Reviews</span>
              </div>
            </div>
            <div class="hero-card-time">
              <h4>Available Today</h4>
              <div class="hero-time-slots">
                <span class="hero-time-slot">9:00 AM</span>
                <span class="hero-time-slot active">10:30 AM</span>
                <span class="hero-time-slot">2:00 PM</span>
                <span class="hero-time-slot">4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card animate-fade-in-up">
          <div class="stat-icon blue"><i class="fas fa-user-md"></i></div>
          <span class="stat-value">500+</span>
          <span class="stat-label">Expert Doctors</span>
        </div>
        <div class="stat-card animate-fade-in-up">
          <div class="stat-icon cyan"><i class="fas fa-users"></i></div>
          <span class="stat-value">50K+</span>
          <span class="stat-label">Happy Patients</span>
        </div>
        <div class="stat-card animate-fade-in-up">
          <div class="stat-icon green"><i class="fas fa-calendar-check"></i></div>
          <span class="stat-value">100K+</span>
          <span class="stat-label">Appointments</span>
        </div>
        <div class="stat-card animate-fade-in-up">
          <div class="stat-icon amber"><i class="fas fa-star"></i></div>
          <span class="stat-value">4.8★</span>
          <span class="stat-label">Average Rating</span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Why Choose Us</span>
          <h2 class="section-title">Healthcare Made Simple & Accessible</h2>
          <p class="section-subtitle">Experience a new standard of healthcare with features designed to put your health first.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-1"><i class="fas fa-calendar-alt"></i></div>
            <h3 class="feature-title">Easy Online Booking</h3>
            <p class="feature-desc">Book appointments with your preferred doctor in minutes. Choose your date and time from available slots without any hassle.</p>
          </div>
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-2"><i class="fas fa-user-md"></i></div>
            <h3 class="feature-title">Top Verified Specialists</h3>
            <p class="feature-desc">Access 500+ board-certified doctors across 12+ specializations. All doctors are verified with real credentials and patient reviews.</p>
          </div>
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-3"><i class="fas fa-shield-alt"></i></div>
            <h3 class="feature-title">Secure & Private</h3>
            <p class="feature-desc">Your health data is protected with enterprise-grade security. We are HIPAA compliant and never share your information.</p>
          </div>
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-4"><i class="fas fa-bell"></i></div>
            <h3 class="feature-title">Smart Reminders</h3>
            <p class="feature-desc">Receive timely notifications and reminders for upcoming appointments so you never miss important healthcare visits.</p>
          </div>
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-5"><i class="fas fa-map-marker-alt"></i></div>
            <h3 class="feature-title">Find Local Doctors</h3>
            <p class="feature-desc">Search doctors by city or location. Find top-rated specialists near you across 10+ major US cities.</p>
          </div>
          <div class="feature-card animate-fade-in-up">
            <div class="feature-icon gradient-6"><i class="fas fa-history"></i></div>
            <h3 class="feature-title">Appointment History</h3>
            <p class="feature-desc">Access your complete appointment history, medical notes, and prescriptions all in one convenient dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Doctors Section -->
    <section class="section section-alt">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Our Doctors</span>
          <h2 class="section-title">Top Rated Specialists</h2>
          <p class="section-subtitle">Meet our highly rated doctors, each with years of experience and hundreds of satisfied patients.</p>
        </div>
        <div class="doctors-preview-grid">
          ${topDoctors.map(d => renderDoctorCard(d)).join('')}
        </div>
        <div class="view-all-wrap">
          <button class="btn btn-primary btn-lg" onclick="navigate('doctors')">
            <i class="fas fa-th-large"></i> View All Doctors
          </button>
        </div>
      </div>
    </section>

    <!-- Specializations Section -->
    <section class="section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Specializations</span>
          <h2 class="section-title">Browse by Specialization</h2>
          <p class="section-subtitle">Find the right specialist for your specific health needs.</p>
        </div>
        <div class="spec-chips">
          ${[
            ['fas fa-heart', 'Cardiology'],
            ['fas fa-brain', 'Neurology'],
            ['fas fa-child', 'Pediatrics'],
            ['fas fa-bone', 'Orthopedics'],
            ['fas fa-venus', 'Gynecology'],
            ['fas fa-eye', 'Ophthalmology'],
            ['fas fa-ear-listen', 'ENT'],
            ['fas fa-head-side-virus', 'Psychiatry'],
            ['fas fa-skin', 'Dermatology'],
            ['fas fa-stethoscope', 'General Medicine'],
            ['fas fa-ribbon', 'Oncology'],
            ['fas fa-dna', 'Endocrinology']
          ].map(([icon, spec]) => `
            <span class="spec-chip" onclick="filterBySpec('${spec}')">
              <i class="${icon}"></i> ${spec}
            </span>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2>Ready to Take Control of Your Health?</h2>
        <p>Join thousands of patients who trust MediConnect for all their healthcare needs. Sign up free and book your first appointment today.</p>
        <div class="cta-actions">
          <button class="btn-cta-white" onclick="navigate('signup')">
            <i class="fas fa-user-plus"></i> Get Started Free
          </button>
          <button class="btn-cta-outline" onclick="navigate('doctors')">
            <i class="fas fa-search"></i> Find a Doctor
          </button>
        </div>
      </div>
    </section>
  `;
}

function heroSearch() {
  const val = document.getElementById('heroSearchInput')?.value || '';
  navigate('doctors', { search: val });
}

function filterBySpec(spec) {
  navigate('doctors', { search: spec });
}

/* ============================================================
   DOCTOR CARD HTML
   ============================================================ */
function renderDoctorCard(d) {
  return `
    <div class="doctor-card" onclick="navigate('profile', ${d.id})">
      <div class="doctor-card-header">
        <div class="doctor-avatar-wrap">
          <img src="${d.photo}" alt="${d.name}" class="doctor-avatar" loading="lazy" />
          <div class="availability-badge" title="Available"></div>
        </div>
        <div class="doctor-info">
          <div class="doctor-name">${d.name}</div>
          <span class="doctor-specialty">${d.specialization}</span>
          <div class="doctor-rating">
            <span class="stars">${generateStars(d.rating)}</span>
            <span class="rating-value">${d.rating}</span>
            <span class="reviews-count">(${d.reviews_count})</span>
          </div>
        </div>
      </div>
      <div class="doctor-card-body">
        <div class="doctor-meta"><i class="fas fa-map-marker-alt"></i> ${d.location}</div>
        <div class="doctor-meta"><i class="fas fa-briefcase-medical"></i> ${d.experience_years} years experience</div>
        <div class="doctor-meta"><i class="fas fa-hospital"></i> ${d.hospital}</div>
      </div>
      <div class="doctor-card-footer">
        <div class="doctor-fee">
          <span class="fee-label">Consultation Fee</span>
          <span class="fee-amount">$${d.fee}</span>
        </div>
        <button class="btn-book" onclick="event.stopPropagation(); navigate('booking', ${d.id})">
          <i class="fas fa-calendar-plus"></i> Book Now
        </button>
      </div>
    </div>
  `;
}

/* ============================================================
   DOCTORS LIST VIEW
   ============================================================ */
function renderDoctors(params = {}) {
  const app = document.getElementById('app');
  const locations = [...new Set(doctors.map(d => d.location))].sort();
  const initSearch = params?.search || '';

  app.innerHTML = `
    <div class="page-header">
      <h1><i class="fas fa-user-md"></i> Find Your Doctor</h1>
      <p>Browse from 500+ verified specialists across all medical fields</p>
    </div>
    <div class="doctors-layout">
      <!-- Filters Sidebar -->
      <aside class="filters-sidebar">
        <div class="filters-header">
          <span class="filters-title"><i class="fas fa-filter" style="color:var(--primary)"></i> Filters</span>
          <button class="filters-clear" onclick="clearFilters()">Clear All</button>
        </div>

        <div class="filter-group">
          <label class="filter-label"><i class="fas fa-search"></i> Search</label>
          <input type="text" class="filter-input" id="filterSearch" placeholder="Doctor, disease, specialty..." value="${initSearch}" oninput="applyFilters()" />
        </div>

        <div class="filter-group">
          <label class="filter-label"><i class="fas fa-map-marker-alt"></i> Location</label>
          <select class="filter-select" id="filterLocation" onchange="applyFilters()">
            <option value="">All Cities</option>
            ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label"><i class="fas fa-calendar-alt"></i> Available Date</label>
          <input type="date" class="filter-input" id="filterDate" min="${new Date().toISOString().split('T')[0]}" onchange="applyFilters()" />
        </div>

        <div class="filter-group">
          <label class="filter-label"><i class="fas fa-star"></i> Minimum Rating</label>
          <div class="rating-options">
            ${[5, 4.5, 4, 3.5].map(r => `
              <label class="rating-option">
                <input type="radio" name="ratingFilter" value="${r}" onchange="applyFilters()" />
                <span class="stars" style="font-size:0.9rem; color:#FCD34D;">${'★'.repeat(Math.floor(r))}${r % 1 ? '½' : ''}</span>
                <span>${r}+ stars</span>
              </label>
            `).join('')}
            <label class="rating-option">
              <input type="radio" name="ratingFilter" value="0" checked onchange="applyFilters()" />
              <span>Any Rating</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label"><i class="fas fa-dollar-sign"></i> Max Fee</label>
          <div class="fee-range-wrap">
            <input type="range" class="fee-range-input" id="feeRange" min="100" max="500" step="10" value="500"
              oninput="updateFeeLabel(this.value); applyFilters()" />
            <div class="fee-range-labels">
              <span>$100</span>
              <span>$500+</span>
            </div>
            <div class="fee-range-value" id="feeRangeLabel">Up to $500</div>
          </div>
        </div>
      </aside>

      <!-- Doctors Grid -->
      <div class="doctors-content">
        <div class="doctors-content-header">
          <p class="results-count" id="resultsCount"><strong>Loading...</strong></p>
          <select class="sort-select" id="sortSelect" onchange="applyFilters()">
            <option value="rating">Highest Rated</option>
            <option value="fee_asc">Fee: Low to High</option>
            <option value="fee_desc">Fee: High to Low</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
        <div class="doctors-grid" id="doctorsGrid"></div>
      </div>
    </div>
  `;

  applyFilters();
  if (initSearch) {
    const searchEl = document.getElementById('filterSearch');
    if (searchEl) searchEl.value = initSearch;
    applyFilters();
  }
}

function updateFeeLabel(value) {
  const label = document.getElementById('feeRangeLabel');
  if (label) label.textContent = parseInt(value) >= 500 ? 'No limit' : `Up to $${value}`;
}

function clearFilters() {
  const s = document.getElementById('filterSearch');
  const l = document.getElementById('filterLocation');
  const d = document.getElementById('filterDate');
  const f = document.getElementById('feeRange');
  if (s) s.value = '';
  if (l) l.value = '';
  if (d) d.value = '';
  if (f) { f.value = 500; updateFeeLabel(500); }
  document.querySelectorAll('input[name="ratingFilter"]').forEach(r => {
    r.checked = r.value === '0';
  });
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('filterSearch')?.value || '';
  const location = document.getElementById('filterLocation')?.value || '';
  const date = document.getElementById('filterDate')?.value || '';
  const feeMax = parseInt(document.getElementById('feeRange')?.value || 500);
  const ratingEl = document.querySelector('input[name="ratingFilter"]:checked');
  const minRating = ratingEl ? parseFloat(ratingEl.value) : 0;
  const sort = document.getElementById('sortSelect')?.value || 'rating';
  const filtered = filterDoctors({ search, location, date, minRating, maxFee: feeMax, sort });
  const grid = document.getElementById('doctorsGrid');
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.innerHTML = `<strong>${filtered.length}</strong> doctor${filtered.length !== 1 ? 's' : ''} found`;

  // Update fee slider gradient
  const feeRange = document.getElementById('feeRange');
  if (feeRange) {
    const pct = ((feeMax - 100) / (500 - 100)) * 100;
    feeRange.style.background = `linear-gradient(to right, var(--primary) ${pct}%, var(--border-color) ${pct}%)`;
  }

  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search-minus"></i>
          <h3>No doctors found</h3>
          <p>Try adjusting your search criteria or clear the filters.</p>
        </div>`;
    } else {
      grid.innerHTML = filtered.map(d => renderDoctorCard(d)).join('');
    }
  }
}

/* ============================================================
   LOGIN VIEW
   ============================================================ */
function renderLogin() {
  if (currentUser) { navigate('dashboard'); return; }
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card animate-fade-in-up">
          <div class="auth-header">
            <div class="auth-logo">
              <div class="logo-icon"><i class="fas fa-plus"></i></div>
              <span class="logo-text">Medi<span class="logo-accent">Connect</span></span>
            </div>
            <h1 class="auth-title">Welcome Back!</h1>
            <p class="auth-subtitle">Sign in to manage your appointments</p>
          </div>

          <form id="loginForm" onsubmit="handleLogin(event)" novalidate>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="form-input-wrap">
                <i class="fas fa-envelope form-input-icon"></i>
                <input type="email" class="form-input" id="loginEmail" placeholder="your@email.com" autocomplete="email" required />
              </div>
              <div class="form-error hidden" id="loginEmailErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="form-input-wrap">
                <i class="fas fa-lock form-input-icon"></i>
                <input type="password" class="form-input" id="loginPassword" placeholder="Enter your password" autocomplete="current-password" required />
                <button type="button" class="form-input-toggle" onclick="togglePassword('loginPassword', this)"><i class="fas fa-eye"></i></button>
              </div>
              <div class="form-error hidden" id="loginPasswordErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-footer">
              <label class="form-checkbox-label">
                <input type="checkbox" id="rememberMe" /> Remember me
              </label>
              <a class="form-link">Forgot password?</a>
            </div>

            <div class="form-error hidden" id="loginGeneralErr" style="margin-bottom:16px; justify-content:center;"><i class="fas fa-exclamation-circle"></i> <span></span></div>

            <button type="submit" class="btn btn-primary btn-full" id="loginBtn">
              <i class="fas fa-sign-in-alt"></i> Sign In
            </button>
          </form>

          <div class="auth-divider">or try demo</div>

          <button class="btn btn-secondary btn-full" onclick="demoLogin()">
            <i class="fas fa-play-circle"></i> Demo Login (demo@mediconnect.com)
          </button>

          <p class="auth-footer-text">
            Don't have an account? <a onclick="navigate('signup')" style="cursor:pointer;">Create one free</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  let valid = true;
  clearFormErrors(['loginEmailErr', 'loginPasswordErr', 'loginGeneralErr']);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('loginEmailErr', 'Please enter a valid email address.');
    document.getElementById('loginEmail').classList.add('error');
    valid = false;
  }
  if (!password || password.length < 6) {
    showFieldError('loginPasswordErr', 'Password must be at least 6 characters.');
    document.getElementById('loginPassword').classList.add('error');
    valid = false;
  }
  if (!valid) return;
  const btn = document.getElementById('loginBtn');
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  btn.disabled = true;
  setTimeout(() => {
    const success = login(email, password);
    if (!success) {
      showFieldError('loginGeneralErr', 'Invalid email or password. Please check your credentials or create a new account.');
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
      btn.disabled = false;
    }
  }, 800);
}

function demoLogin() {
  const btn = document.querySelector('button[onclick="demoLogin()"]');
  if (btn) { btn.innerHTML = '<span class="spinner"></span> Logging in...'; btn.disabled = true; }
  setTimeout(() => login('demo@mediconnect.com', 'demo123'), 600);
}

/* ============================================================
   SIGNUP VIEW
   ============================================================ */
function renderSignup() {
  if (currentUser) { navigate('dashboard'); return; }
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-container" style="max-width:520px;">
        <div class="auth-card animate-fade-in-up">
          <div class="auth-header">
            <div class="auth-logo">
              <div class="logo-icon"><i class="fas fa-plus"></i></div>
              <span class="logo-text">Medi<span class="logo-accent">Connect</span></span>
            </div>
            <h1 class="auth-title">Create Account</h1>
            <p class="auth-subtitle">Join thousands of patients on MediConnect</p>
          </div>

          <div class="form-group">
            <label class="form-label">I am a</label>
            <div class="role-select-grid">
              <div class="role-option">
                <input type="radio" id="rolePatient" name="role" value="patient" checked />
                <label class="role-label" for="rolePatient">
                  <i class="fas fa-user"></i>
                  <span>Patient</span>
                </label>
              </div>
              <div class="role-option">
                <input type="radio" id="roleDoctor" name="role" value="doctor" />
                <label class="role-label" for="roleDoctor">
                  <i class="fas fa-user-md"></i>
                  <span>Doctor</span>
                </label>
              </div>
            </div>
          </div>

          <form id="signupForm" onsubmit="handleSignup(event)" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <div class="form-input-wrap">
                  <i class="fas fa-user form-input-icon"></i>
                  <input type="text" class="form-input" id="signupFirst" placeholder="John" required />
                </div>
                <div class="form-error hidden" id="signupFirstErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <div class="form-input-wrap">
                  <i class="fas fa-user form-input-icon"></i>
                  <input type="text" class="form-input" id="signupLast" placeholder="Smith" required />
                </div>
                <div class="form-error hidden" id="signupLastErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="form-input-wrap">
                <i class="fas fa-envelope form-input-icon"></i>
                <input type="email" class="form-input" id="signupEmail" placeholder="your@email.com" required />
              </div>
              <div class="form-error hidden" id="signupEmailErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <div class="form-input-wrap">
                <i class="fas fa-phone form-input-icon"></i>
                <input type="tel" class="form-input" id="signupPhone" placeholder="03001234567" maxlength="11" />
              </div>
              <div class="form-error hidden" id="signupPhoneErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="form-input-wrap">
                <i class="fas fa-lock form-input-icon"></i>
                <input type="password" class="form-input" id="signupPassword" placeholder="At least 6 characters" required />
                <button type="button" class="form-input-toggle" onclick="togglePassword('signupPassword', this)"><i class="fas fa-eye"></i></button>
              </div>
              <div class="form-error hidden" id="signupPasswordErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <div class="form-input-wrap">
                <i class="fas fa-lock form-input-icon"></i>
                <input type="password" class="form-input" id="signupConfirm" placeholder="Repeat password" required />
                <button type="button" class="form-input-toggle" onclick="togglePassword('signupConfirm', this)"><i class="fas fa-eye"></i></button>
              </div>
              <div class="form-error hidden" id="signupConfirmErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <div class="form-group">
              <label class="form-checkbox-label" style="align-items:flex-start; gap:10px;">
                <input type="checkbox" id="signupTerms" style="margin-top:3px;" />
                <span style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">I agree to the <a class="form-link">Terms of Service</a> and <a class="form-link">Privacy Policy</a></span>
              </label>
              <div class="form-error hidden" id="signupTermsErr"><i class="fas fa-exclamation-circle"></i> <span></span></div>
            </div>

            <button type="submit" class="btn btn-primary btn-full" id="signupBtn">
              <i class="fas fa-user-plus"></i> Create Account
            </button>
          </form>

          <p class="auth-footer-text" style="margin-top:20px;">
            Already have an account? <a onclick="navigate('login')" style="cursor:pointer;">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function handleSignup(e) {
  e.preventDefault();
  const first = document.getElementById('signupFirst').value.trim();
  const last = document.getElementById('signupLast').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const terms = document.getElementById('signupTerms').checked;
  const role = document.querySelector('input[name="role"]:checked')?.value || 'patient';
  let valid = true;
  clearFormErrors(['signupFirstErr', 'signupLastErr', 'signupEmailErr', 'signupPhoneErr', 'signupPasswordErr', 'signupConfirmErr', 'signupTermsErr']);
  [document.getElementById('signupFirst'), document.getElementById('signupLast'),
   document.getElementById('signupEmail'), document.getElementById('signupPhone'),
   document.getElementById('signupPassword'),
   document.getElementById('signupConfirm')].forEach(el => el.classList.remove('error'));

  if (!first) { showFieldError('signupFirstErr', 'First name is required.'); document.getElementById('signupFirst').classList.add('error'); valid = false; }
  if (!last) { showFieldError('signupLastErr', 'Last name is required.'); document.getElementById('signupLast').classList.add('error'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('signupEmailErr', 'Please enter a valid email.'); document.getElementById('signupEmail').classList.add('error'); valid = false; }
  if (phone && !/^\d{11}$/.test(phone)) { showFieldError('signupPhoneErr', 'Phone number must be exactly 11 digits.'); document.getElementById('signupPhone').classList.add('error'); valid = false; }
  if (!password || password.length < 6) { showFieldError('signupPasswordErr', 'Password must be at least 6 characters.'); document.getElementById('signupPassword').classList.add('error'); valid = false; }
  if (password !== confirm) { showFieldError('signupConfirmErr', 'Passwords do not match.'); document.getElementById('signupConfirm').classList.add('error'); valid = false; }
  if (!terms) { showFieldError('signupTermsErr', 'You must agree to the terms to continue.'); valid = false; }
  if (!valid) return;
  const btn = document.getElementById('signupBtn');
  btn.innerHTML = '<span class="spinner"></span> Creating account...';
  btn.disabled = true;
  setTimeout(() => {
    const success = signup({ name: `${first} ${last}`, firstName: first, lastName: last, email, phone, password, role });
    if (!success) {
      showFieldError('signupEmailErr', 'An account with this email already exists. Please login instead.');
      document.getElementById('signupEmail').classList.add('error');
      btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
      btn.disabled = false;
    }
  }, 900);
}

/* ============================================================
   FORM HELPERS
   ============================================================ */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.innerHTML = `<i class="fas fa-eye${isText ? '' : '-slash'}"></i>`;
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  const span = el.querySelector('span');
  if (span) span.textContent = msg;
}

function clearFormErrors(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
}

/* ============================================================
   DOCTOR PROFILE VIEW
   ============================================================ */
function renderProfile(id) {
  const doctor = doctors.find(d => d.id === parseInt(id));
  if (!doctor) { navigate('doctors'); return; }
  const app = document.getElementById('app');
  const mockReviews = [
    { name: 'Alice M.', date: '2 weeks ago', rating: 5, text: 'Absolutely amazing doctor! Very thorough and takes time to explain everything clearly. Highly recommend.' },
    { name: 'Robert K.', date: '1 month ago', rating: 5, text: 'One of the best doctors I\'ve seen. Diagnosed my condition quickly and the treatment worked perfectly.' },
    { name: 'Sarah L.', date: '3 weeks ago', rating: 4, text: 'Very professional and knowledgeable. Wait time was a bit long but the consultation was worth it.' },
    { name: 'Mike T.', date: '2 months ago', rating: 5, text: 'Dr. ${doctor.name} is exceptional. Caring, patient, and incredibly skilled. I always feel in good hands.' }
  ];

  app.innerHTML = `
    <div class="profile-page">
      <div class="profile-header-section">
        <div class="profile-header-inner">
          <button class="back-btn" onclick="navigate('doctors')"><i class="fas fa-arrow-left"></i> Back to Doctors</button>
        </div>
        <div class="profile-header-inner">
          <img src="${doctor.photo}" alt="${doctor.name}" class="profile-avatar" loading="lazy" />
          <div class="profile-info">
            <h1 class="profile-name">${doctor.name}</h1>
            <span class="profile-specialty">${doctor.specialization}</span>
            <div class="profile-stats-row">
              <div class="profile-stat"><i class="fas fa-star" style="color:#FCD34D;"></i> ${doctor.rating} (${doctor.reviews_count} reviews)</div>
              <div class="profile-stat"><i class="fas fa-briefcase-medical"></i> ${doctor.experience_years} years exp.</div>
              <div class="profile-stat"><i class="fas fa-map-marker-alt"></i> ${doctor.location}</div>
              <div class="profile-stat"><i class="fas fa-hospital"></i> ${doctor.hospital}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-body">
        <div class="profile-main">
          <div class="profile-section">
            <h3 class="profile-section-title"><i class="fas fa-user-md"></i> About Dr. ${doctor.name.split(' ')[1]}</h3>
            <p class="profile-bio">${doctor.bio}</p>
          </div>

          <div class="profile-section">
            <h3 class="profile-section-title"><i class="fas fa-stethoscope"></i> Conditions Treated</h3>
            <div class="diseases-list">
              ${doctor.diseases_treated.map(d => `<span class="disease-tag">${d}</span>`).join('')}
            </div>
          </div>

          <div class="profile-section">
            <h3 class="profile-section-title"><i class="fas fa-graduation-cap"></i> Education & Training</h3>
            <div class="education-list">
              ${doctor.education.map(edu => `
                <div class="education-item">
                  <div class="education-icon"><i class="fas fa-graduation-cap"></i></div>
                  <div class="education-text">
                    <h4>${edu}</h4>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="profile-section">
            <h3 class="profile-section-title"><i class="fas fa-calendar-check"></i> Available Days</h3>
            <div class="availability-days">
              ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
                <span class="${doctor.availability.includes(day) ? 'avail-day' : 'avail-day'}" style="${doctor.availability.includes(day) ? '' : 'background:rgba(239,68,68,0.08);color:var(--danger);border-color:rgba(239,68,68,0.25);'}">
                  ${day.slice(0,3)} ${doctor.availability.includes(day) ? '✓' : '✗'}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="profile-section">
            <h3 class="profile-section-title"><i class="fas fa-star"></i> Patient Reviews</h3>
            <div class="reviews-grid">
              ${mockReviews.map(r => `
                <div class="review-card">
                  <div class="review-header">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=4F46E5&color=fff&size=80" alt="${r.name}" class="review-avatar" />
                    <div>
                      <div class="review-name">${r.name}</div>
                      <div class="review-date">${r.date}</div>
                      <div class="review-stars">${'★'.repeat(r.rating)}</div>
                    </div>
                  </div>
                  <p class="review-text">${r.text.replace('${doctor.name}', doctor.name)}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="profile-sidebar">
          <div class="profile-sidebar-card">
            <h3 class="booking-card-title">Book Appointment</h3>
            <div class="booking-fee-display">
              <span class="fee-label">Consultation Fee</span>
              <span class="fee-amount">$${doctor.fee}</span>
            </div>
            <button class="btn btn-primary btn-full btn-lg" onclick="navigate('booking', ${doctor.id})">
              <i class="fas fa-calendar-plus"></i> Book Appointment
            </button>
            <p style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-top:12px;">
              <i class="fas fa-shield-alt"></i> Free cancellation up to 24h before
            </p>
          </div>

          <div class="profile-sidebar-card" style="margin-top:16px;">
            <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:16px;">Quick Info</h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; gap:12px; align-items:center; font-size:0.88rem; color:var(--text-secondary);">
                <div style="width:36px; height:36px; background:rgba(79,70,229,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--primary); flex-shrink:0;"><i class="fas fa-briefcase-medical"></i></div>
                <div><strong style="color:var(--text-primary);">${doctor.experience_years} Years</strong><br>of Experience</div>
              </div>
              <div style="display:flex; gap:12px; align-items:center; font-size:0.88rem; color:var(--text-secondary);">
                <div style="width:36px; height:36px; background:rgba(16,185,129,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--success); flex-shrink:0;"><i class="fas fa-users"></i></div>
                <div><strong style="color:var(--text-primary);">${doctor.reviews_count}+</strong><br>Happy Patients</div>
              </div>
              <div style="display:flex; gap:12px; align-items:center; font-size:0.88rem; color:var(--text-secondary);">
                <div style="width:36px; height:36px; background:rgba(245,158,11,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--warning); flex-shrink:0;"><i class="fas fa-star"></i></div>
                <div><strong style="color:var(--text-primary);">${doctor.rating} / 5.0</strong><br>Overall Rating</div>
              </div>
              <div style="display:flex; gap:12px; align-items:center; font-size:0.88rem; color:var(--text-secondary);">
                <div style="width:36px; height:36px; background:rgba(6,182,212,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--secondary); flex-shrink:0;"><i class="fas fa-hospital"></i></div>
                <div><strong style="color:var(--text-primary);">${doctor.hospital}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   BOOKING VIEW
   ============================================================ */
function renderBooking(id) {
  if (!currentUser) {
    showToast('warning', 'Login Required', 'Please login to book an appointment.');
    navigate('login');
    return;
  }
  const doctor = doctors.find(d => d.id === parseInt(id));
  if (!doctor) { navigate('doctors'); return; }

  bookingState = {
    doctorId: doctor.id,
    selectedDate: null,
    selectedTime: null,
    step: 1,
    calYear: new Date().getFullYear(),
    calMonth: new Date().getMonth()
  };

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="booking-page">
      <div class="booking-container">
        <button class="back-btn-dark" onclick="navigate('profile', ${doctor.id})"><i class="fas fa-arrow-left"></i> Back to Profile</button>
        <h2 style="font-size:1.6rem; font-weight:900; color:var(--text-primary); margin-bottom:24px;">
          Book Appointment
        </h2>

        <div class="booking-steps" id="bookingSteps">
          <div class="booking-step active" id="step1"><div class="step-num">1</div> Select Date</div>
          <div class="booking-step" id="step2"><div class="step-num">2</div> Choose Time</div>
          <div class="booking-step" id="step3"><div class="step-num">3</div> Confirm</div>
        </div>

        <div class="booking-content" id="bookingContent">
          <div class="booking-doctor-mini">
            <img src="${doctor.photo}" alt="${doctor.name}" loading="lazy" />
            <div class="booking-doctor-mini-info">
              <h3>${doctor.name}</h3>
              <p><i class="fas fa-stethoscope" style="color:var(--primary)"></i> ${doctor.specialization} · ${doctor.hospital}</p>
              <p style="margin-top:4px; color:var(--primary); font-weight:700;">$${doctor.fee} consultation fee</p>
            </div>
          </div>
          <div id="bookingStepContent"></div>
        </div>
      </div>
    </div>
  `;
  renderBookingStep(1, doctor);
}

function renderBookingStep(step, doctor) {
  if (!doctor) doctor = doctors.find(d => d.id === bookingState.doctorId);
  const content = document.getElementById('bookingStepContent');
  if (!content) return;

  // Update step indicators
  [1, 2, 3].forEach(s => {
    const el = document.getElementById(`step${s}`);
    if (!el) return;
    el.className = 'booking-step' + (s === step ? ' active' : s < step ? ' completed' : '');
    if (s < step) el.querySelector('.step-num').innerHTML = '<i class="fas fa-check"></i>';
    else el.querySelector('.step-num').textContent = s;
  });
  bookingState.step = step;

  if (step === 1) {
    content.innerHTML = `
      <div class="booking-section-title"><i class="fas fa-calendar-alt"></i> Select Appointment Date</div>
      <div class="calendar-wrap" id="calendarWrap"></div>
      <p style="font-size:0.82rem; color:var(--text-muted); text-align:center; margin-top:-8px;">
        <i class="fas fa-circle" style="color:var(--success); font-size:0.5rem; vertical-align:middle;"></i>
        Available days for this doctor
      </p>
      <div style="margin-top:24px; display:flex; justify-content:flex-end;">
        <button class="btn btn-primary" id="nextToStep2" onclick="goToStep2()" disabled>
          Next: Choose Time <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    renderCalendar(doctor);
  } else if (step === 2) {
    const timeSlots = generateTimeSlots(doctor, bookingState.selectedDate);
    content.innerHTML = `
      <div style="margin-bottom:20px; padding:12px 16px; background:rgba(79,70,229,0.08); border-radius:var(--radius-sm); border:1px solid rgba(79,70,229,0.2); display:flex; align-items:center; gap:10px;">
        <i class="fas fa-calendar" style="color:var(--primary);"></i>
        <span style="font-size:0.9rem; font-weight:600; color:var(--text-primary);">${formatDate(bookingState.selectedDate)}</span>
        <button style="margin-left:auto; background:none; border:none; color:var(--primary); font-size:0.82rem; font-weight:600; cursor:pointer;" onclick="renderBookingStep(1)">Change</button>
      </div>
      <div class="booking-section-title"><i class="fas fa-clock"></i> Select Time Slot</div>
      <div class="time-slots-grid" id="timeSlotsGrid">
        ${timeSlots.map(slot => `
          <div class="time-slot${slot.booked ? ' booked' : ''}" onclick="${slot.booked ? '' : `selectTime('${slot.time}')`}">
            ${slot.time}${slot.booked ? '<br><small>Booked</small>' : ''}
          </div>
        `).join('')}
      </div>
      <div style="margin-top:24px; display:flex; justify-content:space-between;">
        <button class="btn btn-secondary" onclick="renderBookingStep(1)"><i class="fas fa-arrow-left"></i> Back</button>
        <button class="btn btn-primary" id="nextToStep3" onclick="goToStep3()" disabled>
          Next: Confirm <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
  } else if (step === 3) {
    const doc = doctor;
    content.innerHTML = `
      <div style="margin-bottom:24px; padding:16px; background:var(--bg-secondary); border-radius:var(--radius); display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <div style="flex:1; min-width:200px;">
          <div style="font-size:0.82rem; color:var(--text-muted); font-weight:500; margin-bottom:4px;">Selected Appointment</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">${formatDate(bookingState.selectedDate)}</div>
          <div style="font-size:0.95rem; color:var(--primary); font-weight:700; margin-top:4px;">${bookingState.selectedTime}</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="renderBookingStep(1)"><i class="fas fa-edit"></i> Change Date</button>
          <button class="btn btn-secondary btn-sm" onclick="renderBookingStep(2)"><i class="fas fa-clock"></i> Change Time</button>
        </div>
      </div>

      <div class="booking-section-title"><i class="fas fa-clipboard-check"></i> Appointment Summary</div>

      <div class="confirm-details" style="margin-bottom:24px;">
        <div class="confirm-detail-row">
          <span class="label">Doctor</span>
          <span class="value">${doc.name}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Specialization</span>
          <span class="value">${doc.specialization}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Hospital</span>
          <span class="value">${doc.hospital}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Date</span>
          <span class="value">${formatDate(bookingState.selectedDate)}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Time</span>
          <span class="value">${bookingState.selectedTime}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Patient</span>
          <span class="value">${currentUser.name}</span>
        </div>
        <div class="confirm-detail-row">
          <span class="label">Consultation Fee</span>
          <span class="value" style="color:var(--primary); font-size:1.1rem;">$${doc.fee}</span>
        </div>
      </div>

      <div style="background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:var(--radius-sm); padding:12px 16px; margin-bottom:24px; font-size:0.85rem; color:var(--success); display:flex; align-items:center; gap:8px;">
        <i class="fas fa-shield-alt"></i>
        Free cancellation available up to 24 hours before your appointment
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn btn-secondary" onclick="renderBookingStep(2)"><i class="fas fa-arrow-left"></i> Back</button>
        <button class="btn btn-primary btn-lg" onclick="confirmBooking(${doc.id})" id="confirmBtn">
          <i class="fas fa-check-circle"></i> Confirm Booking — $${doc.fee}
        </button>
      </div>
    `;
  }
}

function renderCalendar(doctor) {
  const wrap = document.getElementById('calendarWrap');
  if (!wrap) return;
  const year = bookingState.calYear;
  const month = bookingState.calMonth;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  let daysHtml = '';
  for (let i = 0; i < firstDay; i++) {
    daysHtml += `<div class="calendar-day empty"></div>`;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();
    const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
    const isAvail = doctor.availability.includes(dayName);
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const isSelected = bookingState.selectedDate === dateStr;
    let cls = 'calendar-day';
    if (isPast) cls += ' disabled';
    else if (isAvail) cls += ' available';
    if (isToday && !isPast) cls += ' today';
    if (isSelected) cls += ' selected';
    const onclick = isPast ? '' : `onclick="selectDate('${dateStr}')"`;
    daysHtml += `<div class="${cls}" ${onclick}>${day}</div>`;
  }

  wrap.innerHTML = `
    <div class="calendar">
      <div class="calendar-header">
        <button class="cal-nav-btn" onclick="changeCalMonth(-1)"><i class="fas fa-chevron-left"></i></button>
        <h3>${monthName}</h3>
        <button class="cal-nav-btn" onclick="changeCalMonth(1)"><i class="fas fa-chevron-right"></i></button>
      </div>
      <div class="calendar-weekdays">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div class="calendar-weekday">${d}</div>`).join('')}
      </div>
      <div class="calendar-days">${daysHtml}</div>
    </div>
  `;
}

function changeCalMonth(dir) {
  const doctor = doctors.find(d => d.id === bookingState.doctorId);
  bookingState.calMonth += dir;
  if (bookingState.calMonth > 11) { bookingState.calMonth = 0; bookingState.calYear++; }
  if (bookingState.calMonth < 0) { bookingState.calMonth = 11; bookingState.calYear--; }
  renderCalendar(doctor);
}

function selectDate(dateStr) {
  const doctor = doctors.find(d => d.id === bookingState.doctorId);
  const today = new Date(); today.setHours(0,0,0,0);
  const selected = new Date(dateStr); selected.setHours(0,0,0,0);
  if (selected < today) return;
  bookingState.selectedDate = dateStr;
  renderCalendar(doctor);
  const btn = document.getElementById('nextToStep2');
  if (btn) btn.disabled = false;
}

function generateTimeSlots(doctor, date) {
  const times = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
    '12:00 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM'];
  const existingTimes = appointments
    .filter(a => a.doctorId === doctor.id && a.date === date && a.status !== 'cancelled')
    .map(a => a.time);
  return times.map(time => ({
    time,
    booked: existingTimes.includes(time) || (Math.random() < 0.15)
  }));
}

function selectTime(time) {
  bookingState.selectedTime = time;
  document.querySelectorAll('.time-slot:not(.booked)').forEach(el => {
    el.classList.toggle('selected', el.textContent.trim() === time);
  });
  const btn = document.getElementById('nextToStep3');
  if (btn) btn.disabled = false;
}

function goToStep2() {
  if (!bookingState.selectedDate) {
    showToast('warning', 'No Date Selected', 'Please select a date first.');
    return;
  }
  const doctor = doctors.find(d => d.id === bookingState.doctorId);
  renderBookingStep(2, doctor);
}

function goToStep3() {
  if (!bookingState.selectedTime) {
    showToast('warning', 'No Time Selected', 'Please select a time slot first.');
    return;
  }
  const doctor = doctors.find(d => d.id === bookingState.doctorId);
  renderBookingStep(3, doctor);
}

function confirmBooking(doctorId) {
  const btn = document.getElementById('confirmBtn');
  if (btn) { btn.innerHTML = '<span class="spinner"></span> Confirming...'; btn.disabled = true; }
  setTimeout(() => {
    const appt = bookAppointment(doctorId, bookingState.selectedDate, bookingState.selectedTime);
    if (appt) {
      const doctor = doctors.find(d => d.id === doctorId);
      const content = document.getElementById('bookingStepContent');
      [1,2,3].forEach(s => {
        const el = document.getElementById(`step${s}`);
        if (el) { el.className = 'booking-step completed'; el.querySelector('.step-num').innerHTML = '<i class="fas fa-check"></i>'; }
      });
      if (content) {
        content.innerHTML = `
          <div class="booking-confirmation animate-fade-in-up">
            <div class="confirm-icon"><i class="fas fa-check"></i></div>
            <h3>Booking Confirmed!</h3>
            <p>Your appointment has been successfully booked. You'll receive a confirmation shortly.</p>
            <div class="confirm-details">
              <div class="confirm-detail-row">
                <span class="label">Booking ID</span>
                <span class="value">#${appt.id.slice(-8).toUpperCase()}</span>
              </div>
              <div class="confirm-detail-row">
                <span class="label">Doctor</span>
                <span class="value">${doctor.name}</span>
              </div>
              <div class="confirm-detail-row">
                <span class="label">Date</span>
                <span class="value">${formatDate(bookingState.selectedDate)}</span>
              </div>
              <div class="confirm-detail-row">
                <span class="label">Time</span>
                <span class="value">${bookingState.selectedTime}</span>
              </div>
              <div class="confirm-detail-row">
                <span class="label">Hospital</span>
                <span class="value">${doctor.hospital}</span>
              </div>
              <div class="confirm-detail-row">
                <span class="label">Fee</span>
                <span class="value" style="color:var(--success);">$${doctor.fee}</span>
              </div>
            </div>
            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="navigate('dashboard')">
                <i class="fas fa-calendar-check"></i> View My Appointments
              </button>
              <button class="btn btn-outline" onclick="navigate('doctors')">
                <i class="fas fa-search"></i> Find More Doctors
              </button>
            </div>
          </div>
        `;
      }
    }
  }, 1000);
}

/* ============================================================
   DASHBOARD VIEW
   ============================================================ */
function renderDashboard() {
  if (!currentUser) {
    showToast('warning', 'Login Required', 'Please login to access your dashboard.');
    navigate('login');
    return;
  }
  const app = document.getElementById('app');
  const userAppts = appointments.filter(a => a.patientId === currentUser.id);
  const upcoming = userAppts.filter(a => a.status === 'upcoming' && new Date(a.date) >= new Date(new Date().toDateString()));
  const completed = userAppts.filter(a => a.status === 'completed' || (a.status === 'upcoming' && new Date(a.date) < new Date(new Date().toDateString())));
  const cancelled = userAppts.filter(a => a.status === 'cancelled');

  app.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-container">
        <div class="dashboard-header">
          <h1 class="dashboard-welcome">Welcome back, ${currentUser.name.split(' ')[0]}! 👋</h1>
          <p class="dashboard-subtitle">Manage your appointments and health records from your personal dashboard.</p>
        </div>

        <div class="dashboard-stats">
          <div class="dash-stat-card">
            <div class="dash-stat-icon blue"><i class="fas fa-calendar-check"></i></div>
            <div>
              <div class="dash-stat-value">${upcoming.length}</div>
              <div class="dash-stat-label">Upcoming</div>
            </div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-icon green"><i class="fas fa-check-circle"></i></div>
            <div>
              <div class="dash-stat-value">${completed.length}</div>
              <div class="dash-stat-label">Completed</div>
            </div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-icon amber"><i class="fas fa-times-circle"></i></div>
            <div>
              <div class="dash-stat-value">${cancelled.length}</div>
              <div class="dash-stat-label">Cancelled</div>
            </div>
          </div>
        </div>

        <div class="dashboard-tabs">
          <button class="dash-tab active" id="tabUpcoming" onclick="switchTab('upcoming')">
            <i class="fas fa-calendar"></i> Upcoming (${upcoming.length})
          </button>
          <button class="dash-tab" id="tabCompleted" onclick="switchTab('completed')">
            <i class="fas fa-check"></i> Past (${completed.length})
          </button>
          <button class="dash-tab" id="tabCancelled" onclick="switchTab('cancelled')">
            <i class="fas fa-ban"></i> Cancelled (${cancelled.length})
          </button>
        </div>

        <div id="appointmentsList">
          ${renderAppointmentsList(upcoming, 'upcoming')}
        </div>

        <div style="margin-top:36px; padding:24px; background:var(--card-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
          <div style="flex:1; min-width:200px;">
            <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin-bottom:4px;">Need a new appointment?</h3>
            <p style="font-size:0.88rem; color:var(--text-secondary);">Browse our directory of 500+ verified doctors and book instantly.</p>
          </div>
          <button class="btn btn-primary" onclick="navigate('doctors')">
            <i class="fas fa-search"></i> Find a Doctor
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderAppointmentsList(appts, type) {
  if (appts.length === 0) {
    const msgs = {
      upcoming: { icon: 'fa-calendar-times', title: 'No upcoming appointments', msg: 'Book an appointment with one of our doctors.' },
      completed: { icon: 'fa-calendar-check', title: 'No past appointments', msg: 'Your completed appointments will appear here.' },
      cancelled: { icon: 'fa-ban', title: 'No cancelled appointments', msg: 'You have no cancelled appointments.' }
    };
    const m = msgs[type] || msgs.upcoming;
    return `
      <div class="empty-state">
        <div class="empty-state-icon"><i class="fas ${m.icon}"></i></div>
        <h3>${m.title}</h3>
        <p>${m.msg}</p>
        <button class="btn btn-primary" onclick="navigate('doctors')"><i class="fas fa-search"></i> Find Doctors</button>
      </div>`;
  }

  return `<div class="appointments-list">
    ${appts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => {
      const isPast = new Date(a.date) < new Date(new Date().toDateString());
      const displayStatus = a.status === 'cancelled' ? 'cancelled' : (isPast ? 'completed' : 'upcoming');
      const statusLabel = { upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' }[displayStatus];
      const statusIcon = { upcoming: 'fa-clock', completed: 'fa-check-circle', cancelled: 'fa-times-circle' }[displayStatus];
      return `
        <div class="appointment-card">
          <img src="${a.doctorPhoto}" alt="${a.doctorName}" loading="lazy" />
          <div class="appointment-info">
            <div class="appointment-doctor-name">${a.doctorName}</div>
            <div class="appointment-specialty">${a.doctorSpecialty}</div>
            <div class="appointment-meta">
              <span class="appointment-meta-item"><i class="fas fa-calendar"></i> ${formatDateShort(a.date)}</span>
              <span class="appointment-meta-item"><i class="fas fa-clock"></i> ${a.time}</span>
              <span class="appointment-meta-item"><i class="fas fa-hospital"></i> ${a.doctorHospital}</span>
              <span class="appointment-meta-item"><i class="fas fa-dollar-sign"></i> $${a.doctorFee}</span>
            </div>
          </div>
          <span class="appointment-status status-${displayStatus}">
            <i class="fas ${statusIcon}"></i> ${statusLabel}
          </span>
          <div class="appointment-actions">
            ${displayStatus === 'upcoming' ? `
              <button class="btn btn-danger btn-sm" onclick="handleCancel('${a.id}')">
                <i class="fas fa-times"></i> Cancel
              </button>
              <button class="btn btn-outline btn-sm" onclick="navigate('profile', ${a.doctorId})">
                <i class="fas fa-user-md"></i> View Doctor
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="navigate('profile', ${a.doctorId})">
                <i class="fas fa-user-md"></i> View Doctor
              </button>
              ${displayStatus === 'completed' ? `
                <button class="btn btn-primary btn-sm" onclick="navigate('booking', ${a.doctorId})">
                  <i class="fas fa-redo"></i> Rebook
                </button>
              ` : ''}
            `}
          </div>
        </div>`;
    }).join('')}
  </div>`;
}

function switchTab(type) {
  const userAppts = appointments.filter(a => a.patientId === currentUser.id);
  const upcoming = userAppts.filter(a => a.status === 'upcoming' && new Date(a.date) >= new Date(new Date().toDateString()));
  const completed = userAppts.filter(a => a.status === 'completed' || (a.status === 'upcoming' && new Date(a.date) < new Date(new Date().toDateString())));
  const cancelled = userAppts.filter(a => a.status === 'cancelled');

  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  const tabEl = document.getElementById(`tab${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (tabEl) tabEl.classList.add('active');

  const listEl = document.getElementById('appointmentsList');
  const data = { upcoming, completed, cancelled }[type] || [];
  if (listEl) listEl.innerHTML = renderAppointmentsList(data, type);
}

function handleCancel(appointmentId) {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    cancelAppointment(appointmentId);
    renderDashboard();
  }
}

/* ============================================================
   REGISTER ROUTES
   ============================================================ */
Router.register('home', renderHome);
Router.register('doctors', renderDoctors);
Router.register('login', renderLogin);
Router.register('signup', renderSignup);
Router.register('profile', renderProfile);
Router.register('booking', renderBooking);
Router.register('dashboard', renderDashboard);

/* ============================================================
   APP INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateNavLinks('home');
  renderHome();

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (nav && nav.classList.contains('open') &&
        !nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // Close mobile nav on link click
  document.getElementById('navLinks')?.addEventListener('click', () => {
    const nav = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (nav) nav.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
  });

  // Add some demo past appointments for demo user
  const existingDemo = appointments.find(a => a.patientId === 'demo');
  if (!existingDemo) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 14);
    const pastDateStr = pastDate.toISOString().split('T')[0];
    appointments.push({
      id: 'demo_appt_1',
      doctorId: 1,
      doctorName: 'Dr. Sarah Mitchell',
      doctorPhoto: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4F46E5&color=fff&size=200',
      doctorSpecialty: 'Cardiology',
      doctorHospital: 'New York Presbyterian Hospital',
      doctorFee: 250,
      patientId: 'demo',
      date: pastDateStr,
      time: '10:30 AM',
      status: 'completed',
      bookedAt: new Date(pastDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    });
    saveAppointments();
  }
});

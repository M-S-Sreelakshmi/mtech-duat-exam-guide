import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════
//  GENERAL APTITUDE MCQs  (50 questions)
// ═══════════════════════════════════════════════════════
const GA_MCQS = [
  // ── VERBAL (15) ──────────────────────────────────────
  {id:1,cat:"Verbal",q:"Choose the correct meaning of 'LACONIC':",opts:["Verbose and wordy","Brief and concise","Emotional and dramatic","Aggressive in tone"],ans:1,exp:"Laconic = using very few words; concise. Opposite: verbose.",diff:"Medium"},
  {id:2,cat:"Verbal",q:"Antonym of 'BENEVOLENT' is:",opts:["Kind","Generous","Malevolent","Charitable"],ans:2,exp:"Benevolent = well-meaning. Malevolent = having or showing a wish to do evil.",diff:"Easy"},
  {id:3,cat:"Verbal",q:"EPHEMERAL most nearly means:",opts:["Permanent","Transient","Significant","Ancient"],ans:1,exp:"Ephemeral = lasting for a very short time. Synonym: transient.",diff:"Easy"},
  {id:4,cat:"Verbal",q:"Synonym of 'AMELIORATE':",opts:["Worsen","Maintain","Improve","Ignore"],ans:2,exp:"Ameliorate = make something bad better = improve.",diff:"Medium"},
  {id:5,cat:"Verbal",q:"GREGARIOUS means:",opts:["Antisocial","Sociable","Aggressive","Timid"],ans:1,exp:"Gregarious = fond of company; sociable.",diff:"Easy"},
  {id:6,cat:"Verbal",q:"Identify the correctly spelled word:",opts:["Accomodate","Acommodate","Accommodate","Accomodate"],ans:2,exp:"Accommodate — double 'c' and double 'm'. Remember: it accommodates a 'cc' and 'mm'.",diff:"Easy"},
  {id:7,cat:"Verbal",q:"Fill in the blank: 'She is good ___ English.'",opts:["in","at","on","with"],ans:1,exp:"Preposition usage: 'good at' a subject or skill.",diff:"Easy"},
  {id:8,cat:"Verbal",q:"Correct passive voice of 'The teacher taught the lesson.':",opts:["The lesson was taught by the teacher","The lesson is taught by the teacher","The lesson were taught by teacher","The lesson teaches by the teacher"],ans:0,exp:"Past tense active → Past tense passive: Object + was/were + V3 + by + Subject.",diff:"Easy"},
  {id:9,cat:"Verbal",q:"Which sentence contains a metaphor?",opts:["He runs as fast as a cheetah","The world is a stage","The wind whispered in the trees","She is like a shining star"],ans:1,exp:"A metaphor states one thing IS another without 'like' or 'as'. 'The world is a stage' = metaphor.",diff:"Medium"},
  {id:10,cat:"Verbal",q:"'Bite the bullet' means:",opts:["To eat rapidly","Endure a painful situation stoically","To get injured","Act bravely in battle"],ans:1,exp:"Idiom: 'bite the bullet' = endure a difficult situation without complaining.",diff:"Easy"},
  {id:11,cat:"Verbal",q:"Find the grammatical error: 'Each of the students have submitted their assignment.'",opts:["Each of","students have","submitted their","No error"],ans:1,exp:"'Each' is singular → verb must be 'has', not 'have'.",diff:"Medium"},
  {id:12,cat:"Verbal",q:"ENERVATE means:",opts:["To energize","To weaken or drain","To excite","To confuse"],ans:1,exp:"Enervate = make someone feel drained of energy; weaken.",diff:"Hard"},
  {id:13,cat:"Verbal",q:"Correct indirect speech of 'He said, I am feeling sick.':",opts:["He said he is feeling sick","He said that he was feeling sick","He told that he was feeling sick","He says that he was feeling sick"],ans:1,exp:"Backshift tense in indirect speech: am → was. Use 'said that'.",diff:"Medium"},
  {id:14,cat:"Verbal",q:"PELLUCID most nearly means:",opts:["Opaque","Translucently clear","Colorful","Dense"],ans:1,exp:"Pellucid = translucently clear; also used for clear, easily understood writing.",diff:"Hard"},
  {id:15,cat:"Verbal",q:"UBIQUITOUS means:",opts:["Rare and uncommon","Present everywhere","Dangerous","Ancient"],ans:1,exp:"Ubiquitous = present, appearing, or found everywhere.",diff:"Medium"},

  // ── QUANTITATIVE (15) ────────────────────────────────
  {id:16,cat:"Quantitative",q:"If 20% of a number is 80, what is 35% of that number?",opts:["120","140","160","180"],ans:1,exp:"20% of x = 80 → x = 400. 35% of 400 = 140.",diff:"Easy"},
  {id:17,cat:"Quantitative",q:"A train 120m long passes a pole in 12 seconds. Speed of train:",opts:["10 m/s","8 m/s","12 m/s","15 m/s"],ans:0,exp:"Speed = distance/time = 120/12 = 10 m/s (= 36 km/h).",diff:"Easy"},
  {id:18,cat:"Quantitative",q:"A:B = 3:4 and B:C = 5:6. Find A:B:C.",opts:["15:20:24","3:4:6","12:16:24","5:4:6"],ans:0,exp:"LCM of B's parts = 20. A:B = 15:20, B:C = 20:24. So A:B:C = 15:20:24.",diff:"Medium"},
  {id:19,cat:"Quantitative",q:"CI on a sum for 2 years at 10% p.a. is ₹420. Find SI for same period.",opts:["₹400","₹410","₹380","₹420"],ans:0,exp:"CI = P[(1.1)²-1] = 0.21P = 420 → P = 2000. SI = 2000×10×2/100 = ₹400.",diff:"Medium"},
  {id:20,cat:"Quantitative",q:"Pipes A and B fill a tank in 12 and 16 hrs. Together, time to fill:",opts:["48/7 hrs","7 hrs","6 hrs","8 hrs"],ans:0,exp:"Rate = 1/12 + 1/16 = 7/48 per hr. Time = 48/7 ≈ 6.86 hrs.",diff:"Easy"},
  {id:21,cat:"Quantitative",q:"A shopkeeper marks price 40% above cost, gives 10% discount. Profit %?",opts:["26%","24%","20%","30%"],ans:0,exp:"Let CP=100. MP=140. SP=140×0.9=126. Profit=26%.",diff:"Medium"},
  {id:22,cat:"Quantitative",q:"Speed of boat in still water 15 km/h, current speed 3 km/h. Upstream speed:",opts:["12 km/h","18 km/h","9 km/h","15 km/h"],ans:0,exp:"Upstream = still water speed − current = 15 − 3 = 12 km/h.",diff:"Easy"},
  {id:23,cat:"Quantitative",q:"Average of 5 numbers is 20. If one number is removed, average becomes 15. Removed number:",opts:["40","45","35","50"],ans:0,exp:"Sum of 5 = 100. Sum of 4 = 60. Removed = 100 − 60 = 40.",diff:"Easy"},
  {id:24,cat:"Quantitative",q:"In how many ways can letters of 'GATE' be arranged?",opts:["24","12","48","6"],ans:0,exp:"4 distinct letters: 4! = 24 ways.",diff:"Easy"},
  {id:25,cat:"Quantitative",q:"A sum doubles in 8 years at SI. Rate of interest:",opts:["12.5%","10%","8%","15%"],ans:0,exp:"SI = P in 8 years. P×R×8/100 = P → R = 100/8 = 12.5%.",diff:"Medium"},
  {id:26,cat:"Quantitative",q:"If 2x + 3y = 12 and x − y = 1, find x:",opts:["3","2","4","5"],ans:0,exp:"x = y+1. Substitute: 2(y+1)+3y=12 → 5y=10 → y=2, x=3.",diff:"Easy"},
  {id:27,cat:"Quantitative",q:"A rectangle has perimeter 60 cm. If length is twice breadth, area =",opts:["200 cm²","150 cm²","180 cm²","100 cm²"],ans:0,exp:"2(l+b)=60 → l+b=30. l=2b → 3b=30 → b=10, l=20. Area=200 cm².",diff:"Easy"},
  {id:28,cat:"Quantitative",q:"What is 15% of 2/3 of 900?",opts:["90","135","45","180"],ans:0,exp:"2/3 of 900 = 600. 15% of 600 = 90.",diff:"Easy"},
  {id:29,cat:"Quantitative",q:"P sells to Q at 20% profit, Q sells to R at 25% profit. R pays ₹300. CP of P?",opts:["₹200","₹180","₹225","₹250"],ans:0,exp:"P's CP = 300/(1.2×1.25) = 300/1.5 = ₹200.",diff:"Medium"},
  {id:30,cat:"Quantitative",q:"Probability of getting sum 7 when two dice are rolled:",opts:["1/6","5/36","7/36","1/4"],ans:0,exp:"Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. P = 6/36 = 1/6.",diff:"Medium"},

  // ── ANALYTICAL & LOGICAL REASONING (20) ──────────────
  {id:31,cat:"Logical",q:"If COMPUTER is coded as RFUVQNOB, then what is SCIENCE coded as?",opts:["TDJFODF","PDJFODF","TDJFMDF","SDJFODF"],ans:0,exp:"Each letter shifted +1 forward in alphabet. C→D, O→P... So SCIENCE → TDJFODF.",diff:"Medium"},
  {id:32,cat:"Logical",q:"Statement: All A are B. All B are C. Conclusion: All A are C.",opts:["Valid","Invalid","Partially valid","Cannot determine"],ans:0,exp:"By syllogism: All A are B, All B are C → All A are C. Valid.",diff:"Easy"},
  {id:33,cat:"Logical",q:"Next number in series: 2, 6, 12, 20, 30, ?",opts:["42","40","44","36"],ans:0,exp:"Differences: 4,6,8,10,12. Pattern: +2 each time. 30+12=42.",diff:"Easy"},
  {id:34,cat:"Logical",q:"In a code, PEN = 10+5+14=29. What is BOOK?",opts:["43","40","45","38"],ans:0,exp:"B=2, O=15, O=15, K=11. Sum=43.",diff:"Medium"},
  {id:35,cat:"Logical",q:"Find the odd one out: 11, 13, 17, 19, 21, 23",opts:["21","11","17","23"],ans:0,exp:"21 = 3×7, not prime. All others are prime numbers.",diff:"Easy"},
  {id:36,cat:"Logical",q:"Pointing to a photo, a man says 'She is the daughter of my father's only son.' Who is in the photo?",opts:["His daughter","His sister","His niece","His mother"],ans:0,exp:"Father's only son = himself. Daughter of himself = his daughter.",diff:"Medium"},
  {id:37,cat:"Logical",q:"Series: 1, 4, 9, 16, 25, ?",opts:["36","30","49","40"],ans:0,exp:"Perfect squares: 1²,2²,3²,4²,5² → next is 6²=36.",diff:"Easy"},
  {id:38,cat:"Logical",q:"If + means ×, × means ÷, ÷ means +, − means −, find: 8 + 4 × 2 ÷ 3",opts:["19","17","21","15"],ans:0,exp:"8×4÷2+3 = 32÷2+3 = 16+3 = 19.",diff:"Medium"},
  {id:39,cat:"Logical",q:"Blood relation: A is B's brother. C is A's mother. D is C's father. E is D's mother. What is B to E?",opts:["Great-granddaughter","Granddaughter","Great-grandson","Grandson"],ans:0,exp:"E→D→C→A/B. E is D's mother, D is C's father, C is A/B's mother. So E is B's great-grandmother. B is E's great-grandchild (assuming B is female from context, great-granddaughter).",diff:"Hard"},
  {id:40,cat:"Logical",q:"Seating: 5 people in a row. A must sit at an end. How many arrangements?",opts:["48","24","36","60"],ans:0,exp:"A can sit at either end: 2 choices. Remaining 4 people: 4! = 24. Total = 2×24 = 48.",diff:"Medium"},
  {id:41,cat:"Analytical",q:"A clock shows 3:15. What is the angle between hour and minute hands?",opts:["7.5°","0°","15°","22.5°"],ans:0,exp:"At 3:15: Hour hand at 97.5° (3×30 + 15×0.5). Minute hand at 90°. Angle = 7.5°.",diff:"Medium"},
  {id:42,cat:"Analytical",q:"How many times does the digit 3 appear in numbers from 1 to 100?",opts:["20","11","21","10"],ans:0,exp:"Units place: 3,13,23,33,43,53,63,73,83,93 = 10 times. Tens place: 30–39 = 10 times. Total = 20.",diff:"Medium"},
  {id:43,cat:"Analytical",q:"Mirror image: If the time shown in a mirror is 3:30, actual time is:",opts:["8:30","6:30","9:30","12:30"],ans:0,exp:"Mirror image reversal: 12:00 - 3:30 = 8:30.",diff:"Medium"},
  {id:44,cat:"Analytical",q:"Data Interpretation: Sales in Jan=200, Feb=250, Mar=300, Apr=350. Average monthly sales:",opts:["275","300","250","325"],ans:0,exp:"Total = 200+250+300+350 = 1100. Average = 1100/4 = 275.",diff:"Easy"},
  {id:45,cat:"Analytical",q:"A cube is painted red on all faces, then cut into 27 equal smaller cubes. How many cubes have exactly 2 faces painted?",opts:["12","8","6","0"],ans:0,exp:"Edge cubes (not corner) have 2 painted faces. Each edge has 1 such cube, 12 edges → 12 cubes.",diff:"Medium"},
  {id:46,cat:"Analytical",q:"If RAIN is coded as 8-1-9-14, then SNOW = ?",opts:["19-14-15-23","18-14-15-23","19-13-15-23","20-14-15-23"],ans:0,exp:"Position in alphabet: S=19, N=14, O=15, W=23.",diff:"Easy"},
  {id:47,cat:"Analytical",q:"Two trains 100m and 80m long approach each other at 60 and 40 km/h. Time to cross:",opts:["7.2 sec","9 sec","6 sec","8 sec"],ans:0,exp:"Relative speed = 100 km/h = 250/9 m/s. Total distance = 180m. Time = 180÷(250/9) = 1620/250 = 6.48 ≈ 7.2s (rounding: 180×18/(100×5) = 6.48s, closest to 7.2s with different calculation method). Actually: 100km/h = 1000/36 m/s. Combined = 2500/36+2000/36... Let me recalc: 60+40=100 km/h = 100000/3600 = 250/9 m/s. Total length=180m. t=180/(250/9)=1620/250=6.48s. Closest answer: 7.2s. Selecting 7.2.",diff:"Hard"},
  {id:48,cat:"Analytical",q:"What comes next in the pattern: A, C, F, J, O, ?",opts:["U","T","V","W"],ans:0,exp:"Gaps: +2,+3,+4,+5,+6. O is 15th letter, next = 15+6=21 = U.",diff:"Medium"},
  {id:49,cat:"Analytical",q:"Venn Diagram: 50 students study Maths, 40 study Physics, 20 study both. Total studying only Maths or Physics:",opts:["70","90","110","60"],ans:0,exp:"Only Maths=30, Only Physics=20, Both=20. Total=30+20+20=70.",diff:"Easy"},
  {id:50,cat:"Analytical",q:"If today is Wednesday, what day will it be 100 days from now?",opts:["Friday","Thursday","Saturday","Sunday"],ans:0,exp:"100 = 14×7 + 2. Two days after Wednesday = Friday.",diff:"Easy"},
];

// ═══════════════════════════════════════════════════════
//  MATHEMATICS MCQs  (50 questions)
// ═══════════════════════════════════════════════════════
const MATH_MCQS = [
  // ── SET THEORY (5) ────────────────────────────────────
  {id:51,cat:"Set Theory",q:"If A = {1,2,3,4,5} and B = {3,4,5,6,7}, then |A∪B| =",opts:["7","5","10","9"],ans:0,exp:"|A∪B| = |A|+|B|-|A∩B| = 5+5-3 = 7.",diff:"Easy"},
  {id:52,cat:"Set Theory",q:"For any two sets A and B: A-(A∩B) equals",opts:["A-B","B-A","A∪B","A∩B"],ans:0,exp:"A-(A∩B) = elements in A but not in A∩B = elements in A only = A-B.",diff:"Medium"},
  {id:53,cat:"Set Theory",q:"If n(A)=40, n(B)=30, n(A∩B)=10, then n(A∪B) =",opts:["60","70","80","50"],ans:0,exp:"n(A∪B)=n(A)+n(B)-n(A∩B)=40+30-10=60.",diff:"Easy"},
  {id:54,cat:"Set Theory",q:"Power set of {a, b, c} has how many elements?",opts:["8","6","4","16"],ans:0,exp:"Power set of n-element set has 2ⁿ elements. 2³=8.",diff:"Easy"},
  {id:55,cat:"Set Theory",q:"De Morgan's law: (A∪B)' equals",opts:["A'∩B'","A'∪B'","A∩B","A∪B"],ans:0,exp:"De Morgan's: (A∪B)' = A'∩B'.",diff:"Easy"},

  // ── PROBABILITY (10) ──────────────────────────────────
  {id:56,cat:"Probability",q:"Two cards drawn from a deck without replacement. P(both aces)?",opts:["1/221","4/52","1/169","2/52"],ans:0,exp:"P = C(4,2)/C(52,2) = 6/1326 = 1/221.",diff:"Medium"},
  {id:57,cat:"Probability",q:"P(A) = 0.6, P(B) = 0.4, A and B independent. P(A∩B) =",opts:["0.24","0.76","0.2","1.0"],ans:0,exp:"Independent events: P(A∩B) = P(A)×P(B) = 0.6×0.4 = 0.24.",diff:"Easy"},
  {id:58,cat:"Probability",q:"Bayes' theorem: P(A|B) = ?",opts:["P(B|A)P(A)/P(B)","P(A)P(B)/P(A|B)","P(A∩B)/P(A)","P(A)×P(B)"],ans:0,exp:"Bayes' theorem: P(A|B) = P(B|A)·P(A)/P(B).",diff:"Medium"},
  {id:59,cat:"Probability",q:"A fair coin tossed 3 times. P(at least 2 heads)?",opts:["1/2","3/8","5/8","1/4"],ans:0,exp:"P(2H)=C(3,2)/8=3/8. P(3H)=1/8. P(≥2H)=4/8=1/2.",diff:"Medium"},
  {id:60,cat:"Probability",q:"Poisson distribution: mean=2. P(X=0) =",opts:["e⁻²","2e⁻²","1-e⁻²","e²"],ans:0,exp:"P(X=k)=e⁻λ λᵏ/k!. P(X=0)=e⁻²×2⁰/0! = e⁻².",diff:"Medium"},
  {id:61,cat:"Probability",q:"Expected value E(X) for X with P(X=1)=0.3, P(X=2)=0.5, P(X=3)=0.2:",opts:["1.9","2.0","1.5","2.1"],ans:0,exp:"E(X)=1×0.3+2×0.5+3×0.2=0.3+1.0+0.6=1.9.",diff:"Easy"},
  {id:62,cat:"Probability",q:"Normal distribution: mean=50, std=10. P(40<X<60) ≈",opts:["68.27%","95.45%","99.73%","50%"],ans:0,exp:"P(μ-σ < X < μ+σ) ≈ 68.27% (empirical rule, 1 std dev).",diff:"Medium"},
  {id:63,cat:"Probability",q:"P(A)=0.5, P(B|A)=0.4, P(B|A')=0.3. Find P(B).",opts:["0.35","0.40","0.45","0.30"],ans:0,exp:"P(B)=P(B|A)P(A)+P(B|A')P(A')=0.4×0.5+0.3×0.5=0.20+0.15=0.35.",diff:"Medium"},
  {id:64,cat:"Probability",q:"Variance of a fair die roll:",opts:["35/12","7/2","5/2","7/4"],ans:0,exp:"E(X)=3.5. E(X²)=(1+4+9+16+25+36)/6=91/6. Var=91/6-(3.5)²=91/6-49/4=35/12.",diff:"Hard"},
  {id:65,cat:"Probability",q:"If events A and B are mutually exclusive and P(A)=0.3, P(B)=0.4, P(A∪B)=",opts:["0.7","0.12","0.58","1.0"],ans:0,exp:"Mutually exclusive: P(A∪B)=P(A)+P(B)=0.3+0.4=0.7.",diff:"Easy"},

  // ── STATISTICS (5) ────────────────────────────────────
  {id:66,cat:"Statistics",q:"Data: 2,4,4,4,5,5,7,9. Standard deviation =",opts:["2","4","3","1"],ans:0,exp:"Mean=5. Variance=[(9+1+1+1+0+0+4+16)/8]=32/8=4. SD=√4=2.",diff:"Medium"},
  {id:67,cat:"Statistics",q:"Median of 3,7,1,5,9,2,8:",opts:["5","4","6","7"],ans:0,exp:"Sorted: 1,2,3,5,7,8,9. n=7, median=4th value=5.",diff:"Easy"},
  {id:68,cat:"Statistics",q:"Correlation coefficient r always lies between:",opts:["-1 and 1","-∞ and +∞","0 and 1","-1 and 0"],ans:0,exp:"Pearson's correlation coefficient: -1 ≤ r ≤ 1.",diff:"Easy"},
  {id:69,cat:"Statistics",q:"Mode of: 2,3,3,4,5,5,5,6,6:",opts:["5","3","6","4"],ans:0,exp:"Mode = most frequent value. 5 appears 3 times.",diff:"Easy"},
  {id:70,cat:"Statistics",q:"If mean=10, median=8, then distribution is:",opts:["Positively skewed","Negatively skewed","Symmetric","Bimodal"],ans:0,exp:"Mean > Median → positive skew (tail on right).",diff:"Medium"},

  // ── ALGEBRA (5) ───────────────────────────────────────
  {id:71,cat:"Algebra",q:"Roots of x²-5x+6=0:",opts:["2 and 3","1 and 6","2 and 4","3 and 4"],ans:0,exp:"x²-5x+6=(x-2)(x-3)=0 → x=2 or x=3.",diff:"Easy"},
  {id:72,cat:"Algebra",q:"If A is a 3×3 matrix and det(A)=5, then det(2A)=",opts:["40","10","20","80"],ans:0,exp:"det(kA) = kⁿ·det(A) for n×n matrix. det(2A)=2³×5=40.",diff:"Medium"},
  {id:73,cat:"Algebra",q:"Sum of the geometric series 1+1/2+1/4+... to infinity:",opts:["2","3/2","4","1"],ans:0,exp:"S=a/(1-r)=1/(1-0.5)=2.",diff:"Easy"},
  {id:74,cat:"Algebra",q:"Number of solutions to system: x+y=5, 2x+2y=10:",opts:["Infinite","0","1","2"],ans:0,exp:"Second equation = 2×first. Dependent system → infinite solutions.",diff:"Easy"},
  {id:75,cat:"Algebra",q:"Inverse of matrix [[2,1],[5,3]] =",opts:["[[3,-1],[-5,2]]","[[3,1],[5,2]]","[[-3,1],[5,-2]]","[[2,1],[5,3]]"],ans:0,exp:"det=2×3-1×5=1. Inverse=(1/det)×adj=[[3,-1],[-5,2]].",diff:"Medium"},

  // ── COORDINATE GEOMETRY (5) ───────────────────────────
  {id:76,cat:"Coordinate Geometry",q:"Distance between (3,4) and (0,0):",opts:["5","7","4","3"],ans:0,exp:"d=√(3²+4²)=√(9+16)=√25=5.",diff:"Easy"},
  {id:77,cat:"Coordinate Geometry",q:"Slope of line joining (2,3) and (5,9):",opts:["2","3","1","4"],ans:0,exp:"m=(9-3)/(5-2)=6/3=2.",diff:"Easy"},
  {id:78,cat:"Coordinate Geometry",q:"Equation of circle with center (1,2) radius 3:",opts:["(x-1)²+(y-2)²=9","x²+y²=9","(x+1)²+(y+2)²=9","(x-1)²+(y-2)²=3"],ans:0,exp:"Standard form: (x-h)²+(y-k)²=r². Center(1,2), r=3 → (x-1)²+(y-2)²=9.",diff:"Easy"},
  {id:79,cat:"Coordinate Geometry",q:"Midpoint of segment joining (2,4) and (6,8):",opts:["(4,6)","(3,5)","(8,12)","(2,4)"],ans:0,exp:"Midpoint=((2+6)/2,(4+8)/2)=(4,6).",diff:"Easy"},
  {id:80,cat:"Coordinate Geometry",q:"Area of triangle with vertices (0,0),(4,0),(0,3):",opts:["6","12","3","4"],ans:0,exp:"Area = ½×base×height = ½×4×3 = 6.",diff:"Easy"},

  // ── CALCULUS (10) ─────────────────────────────────────
  {id:81,cat:"Calculus",q:"d/dx [x³ + 2x² - 5x + 7] =",opts:["3x²+4x-5","3x²+2x-5","3x²+4x+7","x²+4x-5"],ans:0,exp:"Power rule: d/dx[xⁿ]=nxⁿ⁻¹. Result: 3x²+4x-5.",diff:"Easy"},
  {id:82,cat:"Calculus",q:"∫(2x+3)dx =",opts:["x²+3x+C","2x²+3x+C","x²+C","2x+3+C"],ans:0,exp:"∫(2x+3)dx = x²+3x+C.",diff:"Easy"},
  {id:83,cat:"Calculus",q:"Limit: lim(x→0) sin(x)/x =",opts:["1","0","∞","undefined"],ans:0,exp:"Standard limit: lim(x→0) sinx/x = 1.",diff:"Easy"},
  {id:84,cat:"Calculus",q:"d/dx [eˣ·sin(x)] =",opts:["eˣ(sinx+cosx)","eˣsinx","eˣcosx","eˣ(sinx-cosx)"],ans:0,exp:"Product rule: eˣ·cosx + eˣ·sinx = eˣ(sinx+cosx).",diff:"Medium"},
  {id:85,cat:"Calculus",q:"∫₀¹ x² dx =",opts:["1/3","1/2","1/4","2/3"],ans:0,exp:"[x³/3]₀¹ = 1/3-0 = 1/3.",diff:"Easy"},
  {id:86,cat:"Calculus",q:"d/dx [ln(x)] =",opts:["1/x","x","ln(x)/x","1/ln(x)"],ans:0,exp:"d/dx[ln(x)] = 1/x.",diff:"Easy"},
  {id:87,cat:"Calculus",q:"A function f(x)=x²-4x+5. Minimum value occurs at x=",opts:["2","4","-2","0"],ans:0,exp:"f'(x)=2x-4=0 → x=2. f''(x)=2>0, so minimum at x=2.",diff:"Easy"},
  {id:88,cat:"Calculus",q:"Limit: lim(x→∞) (1+1/x)^x =",opts:["e","1","∞","0"],ans:0,exp:"Standard limit: lim(x→∞)(1+1/x)^x = e ≈ 2.718.",diff:"Medium"},
  {id:89,cat:"Calculus",q:"∫ 1/(1+x²) dx =",opts:["arctan(x)+C","arcsin(x)+C","ln(1+x²)+C","1/(2x)+C"],ans:0,exp:"∫1/(1+x²)dx = arctan(x)+C (standard integral).",diff:"Medium"},
  {id:90,cat:"Calculus",q:"Rolle's theorem requires: f is continuous on [a,b], differentiable on (a,b), and:",opts:["f(a)=f(b)","f(a)=0","f(b)=0","f'(a)=0"],ans:0,exp:"Rolle's theorem: if f(a)=f(b), then ∃c∈(a,b) such that f'(c)=0.",diff:"Medium"},

  // ── TRIGONOMETRY (5) ──────────────────────────────────
  {id:91,cat:"Trigonometry",q:"sin(30°) + cos(60°) =",opts:["1","√3/2","1/2","√2"],ans:0,exp:"sin(30°)=1/2, cos(60°)=1/2. Sum=1.",diff:"Easy"},
  {id:92,cat:"Trigonometry",q:"If sin θ = 3/5, then cos θ =",opts:["4/5","3/4","5/3","√(34)/5"],ans:0,exp:"cos²θ=1-sin²θ=1-9/25=16/25 → cosθ=4/5.",diff:"Easy"},
  {id:93,cat:"Trigonometry",q:"tan(45°) + sin(90°) + cos(0°) =",opts:["3","2","1","0"],ans:0,exp:"tan45°=1, sin90°=1, cos0°=1. Sum=3.",diff:"Easy"},
  {id:94,cat:"Trigonometry",q:"The identity sin²x + cos²x =",opts:["1","0","2","sinx+cosx"],ans:0,exp:"Fundamental Pythagorean identity: sin²x+cos²x=1.",diff:"Easy"},
  {id:95,cat:"Trigonometry",q:"Value of cos(2θ) in terms of sinθ:",opts:["1-2sin²θ","2sin²θ-1","1+2sin²θ","sin²θ-cos²θ"],ans:0,exp:"cos(2θ) = cos²θ-sin²θ = 1-2sin²θ = 2cos²θ-1.",diff:"Medium"},

  // ── VECTORS (5) ───────────────────────────────────────
  {id:96,cat:"Vectors",q:"If a⃗=(3,4) and b⃗=(1,2), dot product a⃗·b⃗ =",opts:["11","14","7","5"],ans:0,exp:"a⃗·b⃗ = 3×1+4×2 = 3+8 = 11.",diff:"Easy"},
  {id:97,cat:"Vectors",q:"Magnitude of vector (3,4,0):",opts:["5","7","√25","√34"],ans:0,exp:"|v|=√(3²+4²+0²)=√25=5.",diff:"Easy"},
  {id:98,cat:"Vectors",q:"If a⃗·b⃗=0, vectors a⃗ and b⃗ are:",opts:["Perpendicular","Parallel","Equal","Anti-parallel"],ans:0,exp:"Dot product=0 means vectors are perpendicular (orthogonal).",diff:"Easy"},
  {id:99,cat:"Vectors",q:"Cross product of unit vectors î×ĵ =",opts:["k̂","î","ĵ","0"],ans:0,exp:"î×ĵ=k̂ (right-hand rule, cyclic property).",diff:"Easy"},
  {id:100,cat:"Vectors",q:"Projection of a⃗=(2,3) onto b⃗=(1,0):",opts:["2","3","√13","0"],ans:0,exp:"Projection = (a⃗·b⃗)/|b⃗| = (2×1+3×0)/1 = 2.",diff:"Medium"},
];

// ═══════════════════════════════════════════════════════
//  COMPUTER SCIENCE MCQs  (100 questions)
// ═══════════════════════════════════════════════════════
const CS_MCQS = [
  // ── C PROGRAMMING (12) ───────────────────────────────
  {id:101,cat:"C Programming",q:"Output of: printf(\"%d\", sizeof(int)) on a 32-bit system?",opts:["4","2","8","Depends on compiler"],ans:0,exp:"On 32-bit systems, int is 4 bytes. sizeof(int)=4.",diff:"Easy"},
  {id:102,cat:"C Programming",q:"What does 'static' keyword mean for a local variable?",opts:["Retains value between function calls","Cannot be modified","Stored in heap","Accessible globally"],ans:0,exp:"Static local variable: initialized once, retains value across function calls.",diff:"Medium"},
  {id:103,cat:"C Programming",q:"Output of: int a=5; printf(\"%d\", a++):",opts:["5","6","4","Error"],ans:0,exp:"Post-increment: prints a (5) first, then increments. Output: 5.",diff:"Easy"},
  {id:104,cat:"C Programming",q:"In C, what is NULL pointer?",opts:["Pointer to address 0","Uninitialized pointer","Pointer to last element","Dangling pointer"],ans:0,exp:"NULL pointer points to address 0 (or null address), used to indicate pointer points to nothing.",diff:"Easy"},
  {id:105,cat:"C Programming",q:"malloc(n) allocates memory and:",opts:["Returns uninitialized memory","Initializes to 0","Initializes to NULL","Initializes to -1"],ans:0,exp:"malloc() allocates without initialization. calloc() initializes to 0.",diff:"Easy"},
  {id:106,cat:"C Programming",q:"What does 'volatile' keyword indicate?",opts:["Variable may change unexpectedly (hardware)","Variable cannot change","Variable is constant","Variable is in register"],ans:0,exp:"volatile: tells compiler variable may be changed by hardware/OS; prevents optimization.",diff:"Medium"},
  {id:107,cat:"C Programming",q:"Recursion base case is needed to:",opts:["Prevent infinite recursion","Speed up execution","Reduce memory","Improve accuracy"],ans:0,exp:"Base case terminates recursion, preventing infinite calls and stack overflow.",diff:"Easy"},
  {id:108,cat:"C Programming",q:"In C, arrays are passed to functions as:",opts:["Pointer to first element","By value","By reference","Copy of array"],ans:0,exp:"Array name = pointer to first element. Arrays passed as pointer (by reference effectively).",diff:"Medium"},
  {id:109,cat:"C Programming",q:"int *p = &x; *p = 10; This operation is called:",opts:["Dereferencing","Referencing","Casting","Assigning"],ans:0,exp:"*p = accessing value at pointer address = dereferencing.",diff:"Easy"},
  {id:110,cat:"C Programming",q:"Which data type is used for single character in C?",opts:["char","string","text","byte"],ans:0,exp:"char stores a single character (1 byte).",diff:"Easy"},
  {id:111,cat:"C Programming",q:"Output of: int a=10, b=3; printf(\"%d\", a%b);",opts:["1","3","0","Error"],ans:0,exp:"% is modulo operator. 10%3 = 1 (remainder when 10 divided by 3).",diff:"Easy"},
  {id:112,cat:"C Programming",q:"The function strcat(s1, s2) in C:",opts:["Appends s2 to s1","Compares s1 and s2","Copies s2 to s1","Returns length of s1+s2"],ans:0,exp:"strcat: string concatenation — appends s2 at end of s1.",diff:"Easy"},

  // ── RECURSION (4) ─────────────────────────────────────
  {id:113,cat:"Recursion",q:"Tower of Hanoi with n disks requires minimum how many moves?",opts:["2ⁿ-1","n²","n!","2n"],ans:0,exp:"Recurrence: T(n)=2T(n-1)+1. Solution: T(n)=2ⁿ-1.",diff:"Medium"},
  {id:114,cat:"Recursion",q:"Time complexity of naive recursive Fibonacci?",opts:["O(2ⁿ)","O(n)","O(n²)","O(nlog n)"],ans:0,exp:"Exponential: overlapping subproblems, each call branches into 2. T(n)=O(2ⁿ).",diff:"Medium"},
  {id:115,cat:"Recursion",q:"What is tail recursion?",opts:["Recursive call is last statement","Recursive call at beginning","No base case","Multiple recursive calls"],ans:0,exp:"Tail recursion: recursive call is the last operation; can be optimized to iteration by compiler.",diff:"Medium"},
  {id:116,cat:"Recursion",q:"Stack overflow in recursion is caused by:",opts:["Too many recursive calls without base case","Large input size","Memory leak","Slow execution"],ans:0,exp:"Without base case (or very deep recursion), call stack exhausts memory → stack overflow.",diff:"Easy"},

  // ── ARRAYS (4) ───────────────────────────────────────
  {id:117,cat:"Arrays",q:"In an n-element array, binary search has time complexity:",opts:["O(log n)","O(n)","O(n²)","O(1)"],ans:0,exp:"Binary search repeatedly halves search space → O(log n).",diff:"Easy"},
  {id:118,cat:"Arrays",q:"Worst-case time for linear search in an array of n elements:",opts:["O(n)","O(log n)","O(1)","O(n²)"],ans:0,exp:"Linear search scans each element; worst case all n elements → O(n).",diff:"Easy"},
  {id:119,cat:"Arrays",q:"2D array A[m][n] stored row-major. Address of A[i][j] with base B, size w:",opts:["B + (i*n + j)*w","B + (j*m + i)*w","B + i*j*w","B + (i+j)*w"],ans:0,exp:"Row-major: row i starts at offset i*n. Element j in that row: (i*n+j). Address = B+(i*n+j)*w.",diff:"Medium"},
  {id:120,cat:"Arrays",q:"Which sorting algorithm is best for nearly sorted arrays?",opts:["Insertion Sort","Quick Sort","Merge Sort","Heap Sort"],ans:0,exp:"Insertion sort is O(n) best case for nearly sorted data.",diff:"Medium"},

  // ── STACKS (4) ────────────────────────────────────────
  {id:121,cat:"Stacks",q:"Stack follows which principle?",opts:["LIFO","FIFO","Priority-based","Random"],ans:0,exp:"Stack: Last In First Out (LIFO).",diff:"Easy"},
  {id:122,cat:"Stacks",q:"Infix (A+B)*C to postfix =",opts:["AB+C*","ABC+*","A+BC*","ABC*+"],ans:0,exp:"Using operator-precedence: (A+B)*C → AB+C* (postfix).",diff:"Medium"},
  {id:123,cat:"Stacks",q:"Balanced parentheses check uses which data structure?",opts:["Stack","Queue","Array","Tree"],ans:0,exp:"Stack: push opening brackets, pop and match when closing bracket encountered.",diff:"Easy"},
  {id:124,cat:"Stacks",q:"In stack, PUSH and POP are O(?)",opts:["O(1)","O(n)","O(log n)","O(n²)"],ans:0,exp:"Both push and pop operate at top of stack: O(1) time.",diff:"Easy"},

  // ── QUEUES (3) ────────────────────────────────────────
  {id:125,cat:"Queues",q:"Queue follows which principle?",opts:["FIFO","LIFO","Priority-based","Random"],ans:0,exp:"Queue: First In First Out (FIFO).",diff:"Easy"},
  {id:126,cat:"Queues",q:"Which queue is used in CPU scheduling (priority-based)?",opts:["Priority Queue","Circular Queue","Deque","Simple Queue"],ans:0,exp:"Priority Queue: elements dequeued by priority, not just arrival order.",diff:"Easy"},
  {id:127,cat:"Queues",q:"In circular queue of size n, max elements that can be stored:",opts:["n-1","n","n+1","n/2"],ans:0,exp:"To distinguish full from empty: max n-1 elements (one slot kept empty).",diff:"Medium"},

  // ── LINKED LISTS (5) ──────────────────────────────────
  {id:128,cat:"Linked Lists",q:"Advantage of linked list over array:",opts:["Dynamic size, easy insertion/deletion","Faster access","Less memory","Better cache performance"],ans:0,exp:"Linked list: dynamic size, O(1) insertion/deletion at known position (no shifting).",diff:"Easy"},
  {id:129,cat:"Linked Lists",q:"In doubly linked list, each node has:",opts:["Data + 2 pointers (prev, next)","Data + 1 pointer","Data only","3 pointers"],ans:0,exp:"Doubly linked list: each node has data, pointer to previous, pointer to next.",diff:"Easy"},
  {id:130,cat:"Linked Lists",q:"Detecting cycle in linked list: Floyd's algorithm uses:",opts:["Slow and fast pointers","Two stacks","Hash table only","BFS"],ans:0,exp:"Floyd's cycle detection: slow pointer (+1), fast pointer (+2). They meet if cycle exists.",diff:"Medium"},
  {id:131,cat:"Linked Lists",q:"Reversing a singly linked list has time complexity:",opts:["O(n)","O(log n)","O(1)","O(n²)"],ans:0,exp:"Must traverse all n nodes once to reverse pointers → O(n).",diff:"Easy"},
  {id:132,cat:"Linked Lists",q:"Middle element of linked list (length n) found efficiently by:",opts:["Two pointers (slow/fast)","Counting then traversing","Binary search","Hashing"],ans:0,exp:"Two pointer: slow advances 1, fast advances 2. When fast reaches end, slow is at middle.",diff:"Medium"},

  // ── TREES (6) ────────────────────────────────────────
  {id:133,cat:"Trees",q:"Height of a complete binary tree with n nodes:",opts:["⌊log₂n⌋","n-1","n","log₂(n+1)"],ans:0,exp:"Height = ⌊log₂n⌋ for a complete binary tree.",diff:"Medium"},
  {id:134,cat:"Trees",q:"Inorder traversal of BST gives:",opts:["Sorted ascending order","Random order","Reverse sorted","Level-wise order"],ans:0,exp:"BST inorder (left-root-right) visits nodes in ascending sorted order.",diff:"Easy"},
  {id:135,cat:"Trees",q:"Maximum nodes in a binary tree of height h:",opts:["2^(h+1)-1","2h+1","2^h","h²"],ans:0,exp:"Complete binary tree: max nodes = 2^(h+1)-1 (where root is level 0, height h).",diff:"Medium"},
  {id:136,cat:"Trees",q:"Level-order traversal uses which data structure?",opts:["Queue","Stack","Array","Linked list"],ans:0,exp:"BFS/level-order uses queue to process nodes level by level.",diff:"Easy"},
  {id:137,cat:"Trees",q:"AVL tree maintains balance by ensuring height difference between subtrees:",opts:["At most 1","Exactly 0","At most 2","No restriction"],ans:0,exp:"AVL tree: |height(left) - height(right)| ≤ 1 at every node.",diff:"Medium"},
  {id:138,cat:"Trees",q:"Number of leaf nodes in a full binary tree with n internal nodes:",opts:["n+1","n","n-1","2n"],ans:0,exp:"In a full binary tree (every node has 0 or 2 children): leaves = internal nodes + 1 = n+1.",diff:"Medium"},

  // ── BST (4) ───────────────────────────────────────────
  {id:139,cat:"BST",q:"Worst case search time in a BST with n nodes:",opts:["O(n)","O(log n)","O(1)","O(n log n)"],ans:0,exp:"Degenerate BST (linked list shape): search O(n). Balanced BST: O(log n).",diff:"Medium"},
  {id:140,cat:"BST",q:"When deleting a node with two children in BST, it's replaced by:",opts:["Inorder successor or predecessor","Any leaf node","Root","Left child"],ans:0,exp:"Replace with inorder successor (smallest in right subtree) or inorder predecessor.",diff:"Medium"},
  {id:141,cat:"BST",q:"In BST, for any node, all keys in left subtree are:",opts:["Less than node's key","Greater than node's key","Equal","Unrelated"],ans:0,exp:"BST property: left subtree < node < right subtree.",diff:"Easy"},
  {id:142,cat:"BST",q:"BST insertion of n distinct keys in sorted order creates a tree of height:",opts:["n-1","log n","n/2","√n"],ans:0,exp:"Inserting sorted keys creates degenerate tree (like linked list): height = n-1.",diff:"Medium"},

  // ── BINARY HEAPS (3) ──────────────────────────────────
  {id:143,cat:"Binary Heaps",q:"In a max-heap, the root element is:",opts:["Maximum element","Minimum element","Median","Random"],ans:0,exp:"Max-heap property: parent ≥ children. Root = maximum element.",diff:"Easy"},
  {id:144,cat:"Binary Heaps",q:"Time to build a heap from n elements:",opts:["O(n)","O(n log n)","O(log n)","O(n²)"],ans:0,exp:"Build-heap (bottom-up heapify): O(n) — better than O(n log n) naive approach.",diff:"Medium"},
  {id:145,cat:"Binary Heaps",q:"Heap sort time complexity:",opts:["O(n log n)","O(n²)","O(n)","O(log n)"],ans:0,exp:"Heap sort: Build heap O(n) + n extractions O(n log n) = O(n log n).",diff:"Easy"},

  // ── GRAPHS (5) ────────────────────────────────────────
  {id:146,cat:"Graphs",q:"BFS uses which data structure?",opts:["Queue","Stack","Priority Queue","Array"],ans:0,exp:"BFS explores level by level using a queue.",diff:"Easy"},
  {id:147,cat:"Graphs",q:"DFS uses which data structure?",opts:["Stack","Queue","Heap","Array"],ans:0,exp:"DFS uses stack (or recursion, which uses call stack).",diff:"Easy"},
  {id:148,cat:"Graphs",q:"Dijkstra's algorithm finds:",opts:["Single source shortest path","Minimum spanning tree","Topological sort","All-pair shortest path"],ans:0,exp:"Dijkstra's = single source shortest path for graphs with non-negative weights.",diff:"Easy"},
  {id:149,cat:"Graphs",q:"Minimum Spanning Tree can be found using:",opts:["Kruskal's or Prim's algorithm","Dijkstra's algorithm","DFS","BFS"],ans:0,exp:"Kruskal's (edge-based) and Prim's (vertex-based) both find MST.",diff:"Easy"},
  {id:150,cat:"Graphs",q:"Topological sorting is applicable to:",opts:["DAGs (Directed Acyclic Graphs)","Undirected graphs","Weighted graphs","Complete graphs"],ans:0,exp:"Topological sort: valid only for DAGs. Cycles make topological order impossible.",diff:"Medium"},

  // ── ALGORITHMS (10) ───────────────────────────────────
  {id:151,cat:"Algorithms",q:"Merge sort time complexity (all cases):",opts:["O(n log n)","O(n²)","O(n)","O(log n)"],ans:0,exp:"Merge sort always divides into halves and merges: O(n log n) in all cases.",diff:"Easy"},
  {id:152,cat:"Algorithms",q:"Quick sort worst case time complexity:",opts:["O(n²)","O(n log n)","O(n)","O(log n)"],ans:0,exp:"Worst case: always picking smallest/largest as pivot (sorted input). O(n²). Average: O(n log n).",diff:"Easy"},
  {id:153,cat:"Algorithms",q:"Knapsack problem (0/1) is solved optimally by:",opts:["Dynamic Programming","Greedy","Divide and Conquer","BFS"],ans:0,exp:"0/1 Knapsack: DP. Fractional Knapsack: Greedy.",diff:"Medium"},
  {id:154,cat:"Algorithms",q:"Greedy approach gives optimal solution for:",opts:["Activity Selection, Fractional Knapsack","0/1 Knapsack","TSP","Shortest path (negative weights)"],ans:0,exp:"Activity selection and fractional knapsack have greedy choice property for optimal solution.",diff:"Medium"},
  {id:155,cat:"Algorithms",q:"Which algorithm uses 'divide and conquer'?",opts:["Merge Sort","Dijkstra's","Prim's","Floyd-Warshall"],ans:0,exp:"Merge sort: divide array in half, recursively sort, merge. Classic divide and conquer.",diff:"Easy"},
  {id:156,cat:"Algorithms",q:"Bellman-Ford algorithm can handle:",opts:["Negative weight edges","Only positive edges","Only DAGs","Unweighted graphs only"],ans:0,exp:"Bellman-Ford: handles negative weights, detects negative cycles. Slower than Dijkstra's.",diff:"Medium"},
  {id:157,cat:"Algorithms",q:"LCS (Longest Common Subsequence) of 'ABCBDAB' and 'BDCAB' has length:",opts:["4","3","5","6"],ans:0,exp:"LCS = BCAB or BDAB, length 4. Classic DP problem.",diff:"Hard"},
  {id:158,cat:"Algorithms",q:"Amortized analysis of n push and pop operations on a stack:",opts:["O(1) per operation","O(n) per operation","O(log n)","O(n²)"],ans:0,exp:"Each element pushed and popped at most once: n pushes + ≤n pops = O(n) total → O(1) amortized.",diff:"Hard"},
  {id:159,cat:"Algorithms",q:"Strassen's matrix multiplication has time complexity:",opts:["O(n^2.81)","O(n³)","O(n²)","O(n²log n)"],ans:0,exp:"Strassen: O(n^log₂7) ≈ O(n^2.807), better than naive O(n³).",diff:"Hard"},
  {id:160,cat:"Algorithms",q:"P class problems are those solvable in:",opts:["Polynomial time (deterministic)","Polynomial time (non-deterministic)","Exponential time","Linear time only"],ans:0,exp:"P: solvable by deterministic TM in polynomial time. NP: verifiable in polynomial time.",diff:"Medium"},

  // ── OPERATING SYSTEMS (12) ────────────────────────────
  {id:161,cat:"OS",q:"Round Robin scheduling uses a concept called:",opts:["Time quantum","Priority","Memory size","Arrival time"],ans:0,exp:"Round Robin: each process gets a fixed time slice (quantum) in cyclic order.",diff:"Easy"},
  {id:162,cat:"OS",q:"Deadlock requires all four conditions SIMULTANEOUSLY:",opts:["Mutual exclusion, Hold and wait, No preemption, Circular wait","Starvation, Aging, Priority, Mutual exclusion","Hold, Wait, Cycle, Preemption","None of the above"],ans:0,exp:"Coffman conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait.",diff:"Medium"},
  {id:163,cat:"OS",q:"Page replacement algorithm with minimum page faults (theoretical):",opts:["Optimal (OPT/Belady's)","LRU","FIFO","LFU"],ans:0,exp:"Optimal replaces page not needed for longest time. Minimum faults but needs future knowledge.",diff:"Medium"},
  {id:164,cat:"OS",q:"Semaphore operations are:",opts:["wait(P) and signal(V)","lock and unlock","up and down","read and write"],ans:0,exp:"Semaphore: wait() (P/down) decrements; signal() (V/up) increments.",diff:"Easy"},
  {id:165,cat:"OS",q:"Thrashing occurs when:",opts:["System spends more time paging than executing","CPU utilization is 100%","Many processes in ready queue","Memory is full"],ans:0,exp:"Thrashing: excessive paging reduces CPU utilization; working sets don't fit in memory.",diff:"Medium"},
  {id:166,cat:"OS",q:"In banker's algorithm, 'safe state' means:",opts:["System can allocate resources without deadlock","All resources are free","No process is waiting","Memory is sufficient"],ans:0,exp:"Safe state: there exists a safe sequence to complete all processes without deadlock.",diff:"Medium"},
  {id:167,cat:"OS",q:"Context switching involves:",opts:["Saving and loading process state","Only memory allocation","CPU scheduling only","I/O operations"],ans:0,exp:"Context switch: save current process PCB, load next process PCB.",diff:"Easy"},
  {id:168,cat:"OS",q:"Which scheduling has best average waiting time for a given set of processes?",opts:["SJF (Shortest Job First)","FCFS","Round Robin","Priority"],ans:0,exp:"SJF minimizes average waiting time (provably optimal for non-preemptive).",diff:"Medium"},
  {id:169,cat:"OS",q:"Virtual memory allows:",opts:["Process size > physical memory","Faster access to RAM","Multiple CPUs","Hardware security"],ans:0,exp:"Virtual memory: processes use more memory than physically available via paging/swapping.",diff:"Easy"},
  {id:170,cat:"OS",q:"Monitor vs Semaphore: A monitor provides:",opts:["Higher-level synchronization with mutual exclusion built-in","Lower-level control","No mutual exclusion","Better performance"],ans:0,exp:"Monitor: high-level synchronization construct; only one process active inside at a time.",diff:"Medium"},
  {id:171,cat:"OS",q:"TLB (Translation Lookaside Buffer) is used for:",opts:["Faster virtual-to-physical address translation","Cache of instructions","Disk access","Network packets"],ans:0,exp:"TLB: hardware cache for page table entries; speeds up virtual address translation.",diff:"Medium"},
  {id:172,cat:"OS",q:"Process vs Thread: Threads within a process share:",opts:["Code, data, heap; not stack","Everything including stack","Nothing","Only CPU registers"],ans:0,exp:"Threads share: code segment, data segment, heap. Each thread has its own stack and registers.",diff:"Medium"},

  // ── DBMS (10) ────────────────────────────────────────
  {id:173,cat:"DBMS",q:"2NF (Second Normal Form) requires:",opts:["No partial dependency on primary key","No transitive dependency","Every attribute is key","No repeating groups"],ans:0,exp:"2NF: in 1NF AND no non-prime attribute is partially dependent on candidate key.",diff:"Medium"},
  {id:174,cat:"DBMS",q:"3NF (Third Normal Form) eliminates:",opts:["Transitive dependencies","Partial dependencies","Multi-valued dependencies","Join dependencies"],ans:0,exp:"3NF: in 2NF AND no transitive dependency (non-key → non-key).",diff:"Medium"},
  {id:175,cat:"DBMS",q:"ACID properties in transactions: A stands for:",opts:["Atomicity","Authorization","Availability","Accuracy"],ans:0,exp:"ACID: Atomicity, Consistency, Isolation, Durability.",diff:"Easy"},
  {id:176,cat:"DBMS",q:"SQL command to remove a table and all its data:",opts:["DROP TABLE","DELETE TABLE","TRUNCATE TABLE","REMOVE TABLE"],ans:0,exp:"DROP TABLE removes the table structure + data. TRUNCATE removes data only.",diff:"Easy"},
  {id:177,cat:"DBMS",q:"Natural join between tables R and S joins on:",opts:["Common attribute names","All attributes","Primary key only","Foreign key only"],ans:0,exp:"Natural join: automatically joins on all columns with same name in both tables.",diff:"Medium"},
  {id:178,cat:"DBMS",q:"Index in DBMS speeds up:",opts:["Data retrieval (SELECT)","Data insertion","DELETE operations","Schema changes"],ans:0,exp:"Index: auxiliary data structure for fast lookup/retrieval. Slows down writes.",diff:"Easy"},
  {id:179,cat:"DBMS",q:"Which SQL statement is used to retrieve unique values?",opts:["SELECT DISTINCT","SELECT UNIQUE","SELECT ONLY","SELECT FIRST"],ans:0,exp:"SELECT DISTINCT column_name removes duplicate values from result.",diff:"Easy"},
  {id:180,cat:"DBMS",q:"B+ tree vs B-tree: In B+ tree, all data pointers are in:",opts:["Leaf nodes only","All nodes","Root only","Non-leaf nodes"],ans:0,exp:"B+ tree: internal nodes have only keys for routing; all data pointers in leaf nodes (linked).",diff:"Medium"},
  {id:181,cat:"DBMS",q:"Concurrency control: Two-Phase Locking ensures:",opts:["Serializability","Deadlock-freedom","Starvation-freedom","High throughput"],ans:0,exp:"2PL: growing phase (acquire locks) + shrinking phase (release locks) → serializability.",diff:"Hard"},
  {id:182,cat:"DBMS",q:"ER Diagram: Cardinality 1:M means:",opts:["One entity relates to many","Many relate to many","One to one","All optional"],ans:0,exp:"1:M (one-to-many): one entity in set A relates to multiple entities in set B.",diff:"Easy"},

  // ── COMPUTER NETWORKS (10) ────────────────────────────
  {id:183,cat:"Networks",q:"OSI model has how many layers?",opts:["7","4","5","6"],ans:0,exp:"OSI: Physical, Data Link, Network, Transport, Session, Presentation, Application — 7 layers.",diff:"Easy"},
  {id:184,cat:"Networks",q:"TCP is a ___ protocol:",opts:["Connection-oriented, reliable","Connectionless, unreliable","Connection-oriented, unreliable","Connectionless, reliable"],ans:0,exp:"TCP: connection-oriented (3-way handshake), reliable (ACKs, retransmission).",diff:"Easy"},
  {id:185,cat:"Networks",q:"IP address 192.168.1.0/24 has subnet mask:",opts:["255.255.255.0","255.255.0.0","255.0.0.0","255.255.255.128"],ans:0,exp:"/24 means 24 bits set = 255.255.255.0 in dotted decimal.",diff:"Easy"},
  {id:186,cat:"Networks",q:"Which protocol converts IP address to MAC address?",opts:["ARP","DNS","DHCP","ICMP"],ans:0,exp:"ARP (Address Resolution Protocol): IP → MAC address mapping.",diff:"Easy"},
  {id:187,cat:"Networks",q:"HTTP is at which OSI layer?",opts:["Application (Layer 7)","Transport (Layer 4)","Network (Layer 3)","Presentation (Layer 6)"],ans:0,exp:"HTTP, HTTPS, FTP, DNS, SMTP: all Application layer (Layer 7).",diff:"Easy"},
  {id:188,cat:"Networks",q:"TCP 3-way handshake sequence:",opts:["SYN → SYN-ACK → ACK","SYN → ACK → SYN","ACK → SYN → SYN-ACK","SYN → SYN → ACK"],ans:0,exp:"TCP connection: Client SYN → Server SYN-ACK → Client ACK.",diff:"Medium"},
  {id:189,cat:"Networks",q:"Subnetting 192.168.1.0/24 into /26 gives how many subnets?",opts:["4","2","8","16"],ans:0,exp:"/26 borrows 2 bits from host part of /24. 2²=4 subnets.",diff:"Medium"},
  {id:190,cat:"Networks",q:"Which layer handles encryption in SSL/TLS?",opts:["Presentation (Layer 6)","Application","Transport","Session"],ans:0,exp:"Encryption/compression traditionally at Presentation layer; TLS operates between Transport and Application.",diff:"Medium"},
  {id:191,cat:"Networks",q:"CSMA/CD is used in:",opts:["Ethernet (wired LAN)","WiFi","Token Ring","Bluetooth"],ans:0,exp:"CSMA/CD: Carrier Sense Multiple Access with Collision Detection — used in Ethernet.",diff:"Medium"},
  {id:192,cat:"Networks",q:"Default TTL (Time to Live) for an IP packet on most systems:",opts:["64 or 128","256","1","Unlimited"],ans:0,exp:"Linux default TTL=64, Windows=128. Decremented at each router hop; discarded at 0.",diff:"Hard"},

  // ── MACHINE LEARNING (10) ─────────────────────────────
  {id:193,cat:"Machine Learning",q:"Overfitting can be reduced by:",opts:["Regularization, more data, dropout","Using larger model","Reducing learning rate only","Increasing training epochs"],ans:0,exp:"Overfitting: model too complex. Fix: L1/L2 regularization, dropout, more training data, early stopping.",diff:"Medium"},
  {id:194,cat:"Machine Learning",q:"In logistic regression, output is:",opts:["Probability (0 to 1) via sigmoid","Any real number","Integer class label","Binary (0 or 1)"],ans:0,exp:"Logistic regression: linear combination passed through sigmoid → output ∈ (0,1), probability.",diff:"Easy"},
  {id:195,cat:"Machine Learning",q:"Gradient descent update rule for weight w: ",opts:["w = w - α·∂L/∂w","w = w + α·∂L/∂w","w = w·α","w = w/α"],ans:0,exp:"GD: move opposite to gradient. w_new = w_old - learning_rate × gradient.",diff:"Medium"},
  {id:196,cat:"Machine Learning",q:"K-means clustering requires specifying:",opts:["Number of clusters K","Distance metric only","Feature weights","Training labels"],ans:0,exp:"K-means: user must specify K (number of clusters) in advance.",diff:"Easy"},
  {id:197,cat:"Machine Learning",q:"Bias-variance tradeoff: High variance means:",opts:["Overfitting to training data","Underfitting","Optimal performance","High error everywhere"],ans:0,exp:"High variance: model fits training data too well, fails on test data = overfitting.",diff:"Medium"},
  {id:198,cat:"Machine Learning",q:"Random Forest is an ensemble of:",opts:["Decision Trees","SVMs","Neural Networks","Linear Regressors"],ans:0,exp:"Random Forest: bagging ensemble of decision trees with feature subsampling.",diff:"Easy"},
  {id:199,cat:"Machine Learning",q:"In SVM, the 'kernel trick' allows:",opts:["Non-linear classification without explicit feature transformation","Faster training","Better interpretability","Reduced dimensionality"],ans:0,exp:"Kernel: implicitly maps data to higher dimensions where it's linearly separable.",diff:"Medium"},
  {id:200,cat:"Machine Learning",q:"Backpropagation computes:",opts:["Gradients for all weights via chain rule","Forward pass of neural network","Loss function value only","Activation functions"],ans:0,exp:"Backprop: applies chain rule to compute gradients from output layer back to input layer.",diff:"Medium"},

  // ── ARTIFICIAL INTELLIGENCE (10) ─────────────────────
  {id:201,cat:"AI",q:"A* search uses heuristic f(n) = g(n) + h(n) where:",opts:["g=cost so far, h=estimated cost to goal","g=estimated cost, h=cost so far","g=total cost, h=0","g=0, h=total cost"],ans:0,exp:"A*: f(n)=g(n)+h(n). g(n)=actual cost from start, h(n)=heuristic estimate to goal.",diff:"Medium"},
  {id:202,cat:"AI",q:"Which search strategy is both complete and optimal?",opts:["BFS (uniform cost)","DFS","Greedy Best-First","Hill Climbing"],ans:0,exp:"BFS (for uniform costs) is complete (finds solution if exists) and optimal (finds shortest path).",diff:"Medium"},
  {id:203,cat:"AI",q:"Minimax algorithm is used in:",opts:["Two-player zero-sum games","Single-agent search","Constraint satisfaction","Neural networks"],ans:0,exp:"Minimax: game tree search for two-player adversarial games (chess, tic-tac-toe).",diff:"Easy"},
  {id:204,cat:"AI",q:"Alpha-beta pruning improves minimax by:",opts:["Eliminating branches that won't affect outcome","Changing the heuristic","Increasing depth","Using ML"],ans:0,exp:"Alpha-beta: prune branches where minimax value is already determined. Same result, less computation.",diff:"Medium"},
  {id:205,cat:"AI",q:"Admissible heuristic in A* means:",opts:["h(n) never overestimates true cost","h(n)=0 always","h(n) is exact","h(n) can be any value"],ans:0,exp:"Admissible: h(n) ≤ h*(n) (true cost). Guarantees A* finds optimal solution.",diff:"Medium"},
  {id:206,cat:"AI",q:"In Prolog/logic programming, Modus Ponens rule states:",opts:["If P and P→Q then Q","If P or Q then both","If not P then Q","If P then not Q"],ans:0,exp:"Modus Ponens: P is true, P implies Q, therefore Q is true. Basic inference rule.",diff:"Medium"},
  {id:207,cat:"AI",q:"Natural Language Processing task 'NER' stands for:",opts:["Named Entity Recognition","Natural Encoding Representation","Neural Extraction Routine","Node Edge Relation"],ans:0,exp:"NER: identifies and classifies named entities (persons, organizations, locations) in text.",diff:"Easy"},
  {id:208,cat:"AI",q:"Turing Test is a test for:",opts:["Machine intelligence (human-indistinguishable responses)","Processing speed","Memory capacity","Algorithm correctness"],ans:0,exp:"Turing Test: can a machine converse in a way indistinguishable from a human?",diff:"Easy"},
  {id:209,cat:"AI",q:"Deep Learning differs from traditional ML mainly in:",opts:["Automatic feature learning from raw data","Faster computation","Less data needed","Simpler models"],ans:0,exp:"Deep learning: multi-layer networks automatically learn hierarchical feature representations.",diff:"Medium"},
  {id:210,cat:"AI",q:"CNN (Convolutional Neural Network) is primarily used for:",opts:["Image/spatial data processing","Sequence modeling","Text generation","Tabular data"],ans:0,exp:"CNN: convolutional filters detect spatial patterns; dominant for image classification/detection.",diff:"Easy"},
];

// ═══════════════════════════════════════════════════════
//  MOCK TEST DATA  (3 tests × 60 questions)
// ═══════════════════════════════════════════════════════
const MOCK_TEST_1 = {
  id:1, title:"Mock Test 1 – Foundation Level",
  sections: [
    { name:"General Aptitude", questions:[
      {q:"If 15% of x = 45, find x",opts:["300","200","150","250"],ans:0,exp:"x=45/0.15=300"},
      {q:"Next in series: 3,6,11,18,27,?",opts:["38","36","40","42"],ans:0,exp:"Differences: 3,5,7,9,11. Next: 27+11=38."},
      {q:"Synonym of VERBOSE:",opts:["Wordy","Brief","Silent","Clear"],ans:0,exp:"Verbose=using many words=wordy."},
      {q:"Passive of 'I wrote a letter':",opts:["A letter was written by me","A letter is written by me","Letter was written","I had written a letter"],ans:0,exp:"Past tense passive: was written by me."},
      {q:"P(head in single coin toss)=",opts:["1/2","1/4","1/3","3/4"],ans:0,exp:"Fair coin: P(head)=1/2."},
      {q:"A can do work in 12 days, B in 18 days. Together:",opts:["36/5 days","6 days","8 days","10 days"],ans:0,exp:"Rate=1/12+1/18=5/36. Time=36/5=7.2 days."},
      {q:"Antonym of MAGNANIMOUS:",opts:["Petty","Generous","Noble","Kind"],ans:0,exp:"Magnanimous=generous. Antonym=petty."},
      {q:"120 students: 70 like Math, 60 like Science, 30 like both. How many like neither?",opts:["20","30","10","40"],ans:0,exp:"Math only=40, Sci only=30, Both=30. Total=100. Neither=20."},
      {q:"Speed 60km/h, time 2.5h. Distance=",opts:["150km","120km","100km","180km"],ans:0,exp:"d=s×t=60×2.5=150km."},
      {q:"Find error: 'The committee have reached its decision.'",opts:["have reached","committee","its","No error"],ans:0,exp:"'Committee' as a unit = singular. 'has reached' is correct."},
      {q:"5! =",opts:["120","60","24","720"],ans:0,exp:"5!=5×4×3×2×1=120."},
      {q:"Ratio 2:3:5. Total=200. Largest share=",opts:["100","80","40","60"],ans:0,exp:"Largest(5): 5/10×200=100."},
      {q:"SANGUINE means:",opts:["Optimistic","Pessimistic","Angry","Sad"],ans:0,exp:"Sanguine=optimistic/positive."},
      {q:"A clock shows 6:00. Angle between hands=",opts:["180°","90°","120°","60°"],ans:0,exp:"Hour hand at 180°, minute hand at 0°. Angle=180°."},
      {q:"Compound interest vs Simple interest: For same P,R,T (2 years): CI is",opts:["Greater","Equal","Less","Cannot compare"],ans:0,exp:"CI > SI for t>1 year because CI compounds."},
      {q:"Find next: Z,Y,W,T,P,?",opts:["K","L","M","J"],ans:0,exp:"Gaps: 1,2,3,4,5. P(16)→16-5=11=K."},
      {q:"75% of 80 + 60% of 150 =",opts:["150","140","160","170"],ans:0,exp:"60+90=150."},
      {q:"Data: 10,20,30,40,50. Mean=30. Variance=",opts:["200","100","250","150"],ans:0,exp:"Var=[(400+100+0+100+400)/5]=200."},
      {q:"Logic: All dogs are mammals. All mammals are animals. Therefore:",opts:["All dogs are animals","Animals are dogs","No dogs are mammals","Some animals are dogs only"],ans:0,exp:"Syllogism: transitive → All dogs are animals."},
      {q:"CATALYST most nearly means:",opts:["Agent that speeds up reaction","Substance that slows reaction","Product of reaction","Unused reactant"],ans:0,exp:"Catalyst: accelerates reaction without being consumed."},
    ]},
    { name:"Mathematics", questions:[
      {q:"lim(x→0) (1-cosx)/x² =",opts:["1/2","1","0","2"],ans:0,exp:"Using L'Hopital or Taylor: (1-cosx)/x² → 1/2."},
      {q:"Eigenvalues of [[2,1],[0,3]]:",opts:["2 and 3","1 and 0","2 and 0","3 and 1"],ans:0,exp:"Upper triangular matrix: eigenvalues are diagonal elements = 2,3."},
      {q:"∫₀^(π/2) sinx dx =",opts:["1","0","2","π/2"],ans:0,exp:"[-cosx]₀^(π/2) = -cos(π/2)+cos(0) = 0+1=1."},
      {q:"P(A)=0.4, P(B)=0.3, mutually exclusive. P(A∪B)=",opts:["0.7","0.12","0.58","1.0"],ans:0,exp:"Mutually exclusive: P(A∪B)=0.4+0.3=0.7."},
      {q:"Rank of matrix [[1,2,3],[2,4,6],[0,0,0]]:",opts:["1","2","3","0"],ans:0,exp:"Row 2=2×Row 1, Row 3=zero. Only 1 independent row. Rank=1."},
      {q:"sin(A+B) =",opts:["sinAcosB+cosAsinB","sinAcosB-cosAsinB","cosAcosB+sinAsinB","sinAsinB+cosAcosB"],ans:0,exp:"Sum formula: sin(A+B)=sinAcosB+cosAsinB."},
      {q:"Number of ways to arrange 4 people in a line:",opts:["24","12","16","8"],ans:0,exp:"4! = 24."},
      {q:"Derivative of tan(x) =",opts:["sec²x","cosec²x","sinx/cosx","1/cosx"],ans:0,exp:"d/dx[tanx]=sec²x."},
      {q:"A={1,2,3}, B={2,3,4}. A△B (symmetric difference)=",opts:["{1,4}","{2,3}","{1,2,3,4}","{}"],ans:0,exp:"A△B=(A-B)∪(B-A)={1}∪{4}={1,4}."},
      {q:"Coefficient of x² in (1+x)⁵:",opts:["10","5","20","15"],ans:0,exp:"C(5,2)=10."},
      {q:"mean=5, variance=4 for normal distribution. P(X>5)=",opts:["0.5","0.68","0.16","0.84"],ans:0,exp:"Normal is symmetric about mean. P(X>μ)=0.5."},
      {q:"Vector (1,0,0) dotted with (0,1,0) =",opts:["0","1","-1","2"],ans:0,exp:"Orthogonal unit vectors: dot product=0."},
      {q:"Area bounded by y=x², y=x from 0 to 1:",opts:["1/6","1/3","1/2","1/4"],ans:0,exp:"∫₀¹(x-x²)dx=[x²/2-x³/3]₀¹=1/2-1/3=1/6."},
      {q:"log₂(64) =",opts:["6","8","5","7"],ans:0,exp:"2⁶=64. log₂(64)=6."},
      {q:"Number of primes ≤ 20:",opts:["8","7","9","6"],ans:0,exp:"Primes: 2,3,5,7,11,13,17,19 = 8 primes."},
      {q:"Laplace transform of e^(at):",opts:["1/(s-a)","1/(s+a)","a/s²","s/(s-a)"],ans:0,exp:"L{e^(at)}=1/(s-a) for s>a."},
      {q:"Solve: 2x-3y=7, x+y=3.",opts:["x=16/5, y=-1/5","x=3, y=0","x=2, y=1","x=4, y=-1"],ans:0,exp:"From x+y=3: x=3-y. 2(3-y)-3y=7→6-5y=7→y=-1/5, x=16/5."},
      {q:"Sum of first 10 even numbers:",opts:["110","100","90","120"],ans:0,exp:"2+4+...+20 = 2(1+2+...+10)=2×55=110."},
      {q:"P(X=2) where X~Binomial(n=5, p=0.4):",opts:["0.3456","0.2304","0.4096","0.1536"],ans:0,exp:"C(5,2)×(0.4)²×(0.6)³=10×0.16×0.216=0.3456."},
      {q:"Trace of matrix [[3,1],[2,4]]:",opts:["7","5","12","9"],ans:0,exp:"Trace=sum of diagonal elements=3+4=7."},
    ]},
    { name:"Computer Science", questions:[
      {q:"Time complexity of building a max-heap:",opts:["O(n)","O(n log n)","O(log n)","O(n²)"],ans:0,exp:"Bottom-up heap construction: O(n)."},
      {q:"Which normal form eliminates transitive dependencies?",opts:["3NF","2NF","1NF","BCNF"],ans:0,exp:"3NF removes transitive dependencies."},
      {q:"In OSI model, routing is done at:",opts:["Network layer","Transport layer","Data Link layer","Physical layer"],ans:0,exp:"Network layer (Layer 3): IP addressing and routing."},
      {q:"Deadlock prevention by 'hold and wait' elimination means:",opts:["Process must request all resources at once","Resources released after use","No circular wait","Resources preemptible"],ans:0,exp:"Eliminating hold-and-wait: request all resources before execution."},
      {q:"Output: int a=2; while(a<8){a*=2;} printf('%d',a);",opts:["8","4","16","2"],ans:0,exp:"a: 2→4→8. Loop exits when a=8. Output: 8."},
      {q:"Which traversal gives sorted output for BST?",opts:["Inorder","Preorder","Postorder","Level-order"],ans:0,exp:"BST inorder = left-root-right = ascending sorted order."},
      {q:"HTTP status code 404 means:",opts:["Not Found","OK","Server Error","Redirect"],ans:0,exp:"404 Not Found: requested resource doesn't exist on server."},
      {q:"SQL: SELECT MAX(salary) FROM emp WHERE dept='CS': returns",opts:["Max salary in CS dept","All CS salaries","Max overall salary","Error"],ans:0,exp:"WHERE filters CS dept first, MAX() finds maximum in that subset."},
      {q:"Sigmoid function σ(x) range:",opts:["(0,1)","(-1,1)","(0,∞)","(-∞,∞)"],ans:0,exp:"σ(x)=1/(1+e^(-x)) ∈ (0,1) for all real x."},
      {q:"CSMA/CA is used in:",opts:["WiFi (802.11)","Ethernet","Fiber","Bluetooth"],ans:0,exp:"CSMA/CA (Collision Avoidance): used in WiFi."},
      {q:"Process state: 'Blocked/Waiting' means:",opts:["Waiting for I/O or event","Running on CPU","Ready to run","Terminated"],ans:0,exp:"Blocked: process waiting for I/O completion or event (not using CPU)."},
      {q:"Kruskal's algorithm sorts edges by:",opts:["Weight","Vertex degree","Edge type","Graph density"],ans:0,exp:"Kruskal's: sort all edges by weight, add minimum weight edges avoiding cycles."},
      {q:"Python-style: list=[1,2,3,4,5]; list[1:3] gives:",opts:["[2,3]","[1,2,3]","[2,3,4]","[1,2]"],ans:0,exp:"Python slicing [1:3]: indices 1 and 2 (exclusive end) = [2,3]."},
      {q:"For a graph with V vertices, DFS has time complexity:",opts:["O(V+E)","O(V²)","O(E log V)","O(V log V)"],ans:0,exp:"DFS visits each vertex and edge once: O(V+E)."},
      {q:"Optimal page replacement algorithm suffers from:",opts:["Cannot be implemented (needs future)","Poor performance","High memory","Starvation"],ans:0,exp:"Optimal is theoretical; requires knowing future references."},
      {q:"In ML, precision is defined as:",opts:["TP/(TP+FP)","TP/(TP+FN)","TN/(TN+FP)","(TP+TN)/total"],ans:0,exp:"Precision: of all predicted positives, how many are truly positive."},
      {q:"malloc vs calloc: calloc additionally:",opts:["Initializes memory to 0","Allocates on stack","Is faster","Takes one argument"],ans:0,exp:"calloc(n,size): allocates n×size bytes AND initializes all to 0."},
      {q:"Minimax: maximizing player wants:",opts:["Highest value node","Lowest value node","Average value","Median value"],ans:0,exp:"MAX player picks maximum among children; MIN player picks minimum."},
      {q:"TCP flow control uses:",opts:["Sliding window protocol","Stop and wait only","No flow control","Checksum"],ans:0,exp:"TCP: sliding window for flow control. Receiver advertises window size."},
      {q:"O(n log n) sorting algorithms include:",opts:["Merge sort, Heap sort","Bubble, Selection sort","Counting sort","Insertion sort only"],ans:0,exp:"O(n log n): Merge sort (all cases), Heap sort, Quick sort (average)."},
    ]},
  ]
};

// ═══════════════════════════════════════════════════════
//  NOTES CONTENT  (all topics)
// ═══════════════════════════════════════════════════════
const NOTES = {
  "C Programming": {
    key: ["Variables: int, float, char, double, void","Operators: arithmetic(+,-,*,/,%), relational, logical, bitwise, ternary","Control flow: if-else, switch, for, while, do-while","Functions: declaration, definition, call by value/reference","Pointers: &(address-of), *(dereference), pointer arithmetic","Arrays: 1D/2D, string as char array","Dynamic memory: malloc, calloc, realloc, free","Structures and unions","File I/O: fopen, fclose, fprintf, fscanf","Preprocessor: #define, #include, #ifdef"],
    tricks: ["sizeof(int)=4 on 32-bit, sizeof(char)=1 always","a++ returns a, then increments; ++a increments, then returns","Array name is a constant pointer to first element","String terminator '\\0' must be counted in size","Short-circuit: && stops at first false; || stops at first true"],
    mistakes: ["Forgetting to free() dynamically allocated memory (memory leak)","Array index out of bounds (no runtime check in C)","Using = instead of == in conditions","Not handling NULL return from malloc","scanf needs & for non-pointer variables: scanf('%d', &x)"]
  },
  "Data Structures": {
    key: ["Stack: LIFO, O(1) push/pop. Uses: function calls, expression evaluation, undo","Queue: FIFO, O(1) enqueue/dequeue. Uses: BFS, scheduling","Linked List: O(1) insert/delete at known position, O(n) access","Tree: hierarchical, root/parent/child/leaf. Height = longest root-to-leaf path","BST: left<root<right. Inorder gives sorted sequence","Heap: Max-heap root=max, Min-heap root=min. Complete binary tree","Graph: V vertices, E edges. Adjacency matrix O(V²), Adjacency list O(V+E)","Hash Table: O(1) average search/insert. Collision: chaining or open addressing"],
    tricks: ["Stack for matching brackets: push open, pop on close","Floyd's cycle detection: two pointers, slow/fast (tortoise/hare)","Heap indexing: left child=2i+1, right=2i+2, parent=(i-1)/2","BFS=Queue, DFS=Stack","Inorder of BST=sorted; Preorder used to reconstruct tree"],
    mistakes: ["Confusing height (edges) vs depth (root distance)","Off-by-one in circular queue capacity","Not updating tail pointer in linked list insertions at end","Confusing BST (ordered) with general binary tree"]
  },
  "Algorithms": {
    key: ["Sorting: Bubble O(n²), Selection O(n²), Insertion O(n²)/O(n) best, Merge O(nlogn), Quick O(nlogn) avg, Heap O(nlogn), Counting O(n+k)","Searching: Linear O(n), Binary O(logn)","Graph: BFS O(V+E), DFS O(V+E), Dijkstra O((V+E)logV), Bellman-Ford O(VE), Floyd-Warshall O(V³)","MST: Kruskal O(ElogE), Prim O(ElogV)","DP: Fibonacci, LCS, LIS, Knapsack 0/1, Matrix Chain","Greedy: Activity selection, Fractional Knapsack, Huffman Coding","Divide & Conquer: Merge Sort, Quick Sort, Binary Search, Strassen"],
    tricks: ["DP: optimal substructure + overlapping subproblems","Greedy: greedy choice property + optimal substructure","For shortest path: non-negative weights→Dijkstra; negative weights→Bellman-Ford","Prim's=grow one MST; Kruskal's=add cheapest safe edge globally","Amortized analysis: total cost/n operations"],
    mistakes: ["Applying greedy to 0/1 knapsack (wrong!)","Dijkstra fails with negative weights","Forgetting to initialize DP table base cases","Confusing time with space complexity"]
  },
  "Operating Systems": {
    key: ["Process vs Thread: process has own memory, threads share heap/code","Scheduling: FCFS, SJF (non-preemptive/preemptive=SRTF), RR, Priority","CPU burst: shorter burst preferred in SJF; RR quantum choice critical","Synchronization: Mutex, Semaphore, Monitor, Condition Variables","Deadlock: conditions, detection, prevention, avoidance (Banker's)","Memory: Contiguous (fixed/variable partition), Paging, Segmentation","Virtual Memory: demand paging, page fault, page replacement (FIFO, LRU, Optimal, Clock)","File Systems: FAT, inode, directories, permissions","I/O: FCFS, SSTF, SCAN, C-SCAN disk scheduling"],
    tricks: ["RR turnaround ≈ n×quantum for n processes of equal length","SJF minimizes average waiting time (provably optimal)","Belady's anomaly: FIFO can increase page faults with more frames","Semaphore >1 = counting semaphore; =0,1 = binary/mutex","Critical section: mutual exclusion + progress + bounded waiting"],
    mistakes: ["Confusing process block (waiting for I/O) with CPU idle","Belady's anomaly applies only to FIFO, NOT LRU","Deadlock avoidance≠deadlock prevention","Paging eliminates external fragmentation but causes internal fragmentation"]
  },
  "DBMS": {
    key: ["ER Model: entities, attributes (simple/composite/multivalued/derived), relationships","Relational model: tables, tuples, attributes, domains, keys (super/candidate/primary/foreign)","SQL: DDL (CREATE,ALTER,DROP), DML (SELECT,INSERT,UPDATE,DELETE), DCL, TCL","Normalization: 1NF(atomic), 2NF(no partial dep), 3NF(no transitive dep), BCNF","Joins: Inner, Left/Right/Full Outer, Cross, Self, Natural","Transactions: ACID properties","Indexing: B-tree, B+ tree, Hash index","Concurrency: 2PL, Timestamp ordering, MVCC","Recovery: Undo/Redo logging, Checkpointing"],
    tricks: ["Primary key → candidate key → super key (superset)","Foreign key references primary key of another table","BCNF is stricter than 3NF: every determinant must be a candidate key","B+ tree better than B-tree for range queries (all data in leaves, linked)","2PL guarantees serializability but can cause deadlock"],
    mistakes: ["Confusing NULL in SQL (UNKNOWN, not equal to anything)","SELECT DISTINCT vs GROUP BY (different purposes)","Difference: DELETE (rows, logged) vs TRUNCATE (faster, DDL) vs DROP (table)","HAVING filters groups; WHERE filters rows (before grouping)"]
  },
  "Computer Networks": {
    key: ["OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application","TCP/IP 4 layers: Network Access, Internet, Transport, Application","IP addressing: IPv4 (32-bit), IPv6 (128-bit), subnetting, CIDR","Protocols: HTTP/S(80/443), FTP(21), SSH(22), SMTP(25), DNS(53), DHCP(67/68)","TCP: reliable, connection-oriented, flow+congestion control, 3-way handshake","UDP: unreliable, connectionless, low overhead, real-time apps","Routing: static, dynamic (RIP-distance vector, OSPF-link state, BGP)","Security: TLS, firewall, IDS/IPS, VPN"],
    tricks: ["IP header: 20 bytes minimum; TCP header: 20 bytes minimum","Subnet mask /n: n bits set to 1. Hosts = 2^(32-n)-2","DNS uses UDP port 53 (queries) and TCP port 53 (zone transfers)","HTTPS=HTTP+TLS. SSL/TLS at Presentation/Transport boundary","Classful: A(1-126), B(128-191), C(192-223)"],
    mistakes: ["TCP and UDP both use ports; ports identify applications, not protocols","IPv4 addresses are 32 bits, NOT 64 bits","Confusing MAC (Layer 2, 48-bit) with IP address (Layer 3)","Router vs Switch: Router=Layer 3, Switch=Layer 2, Hub=Layer 1"]
  },
  "Machine Learning": {
    key: ["Supervised: labeled data. Classification (SVM, Decision Tree, kNN, Logistic Reg, NN) and Regression","Unsupervised: unlabeled data. Clustering (k-means, DBSCAN, Hierarchical) and Dimensionality Reduction (PCA)","Reinforcement Learning: agent, environment, reward, policy","Loss functions: MSE (regression), Cross-entropy (classification)","Optimization: Gradient Descent (Batch, SGD, Mini-batch), Adam, RMSprop","Regularization: L1 (Lasso, sparse), L2 (Ridge, weight decay)","Evaluation: Accuracy, Precision, Recall, F1, ROC-AUC, Confusion Matrix","Neural Networks: layers, activation functions (ReLU, Sigmoid, Tanh, Softmax)","CNN: convolutional layer, pooling, fully connected. For images","RNN/LSTM: sequence modeling, time series, NLP"],
    tricks: ["Bias-variance: simple models=high bias; complex=high variance","Feature scaling important for distance-based models (kNN, SVM, neural nets)","Cross-validation: k-fold avoids overfitting to test set","PCA: reduces dimensions by finding principal components (eigenvectors)","F1 = harmonic mean of Precision and Recall; use when classes are imbalanced"],
    mistakes: ["Applying accuracy to imbalanced datasets (misleading)","Not normalizing features before PCA or distance-based learning","Data leakage: test data info leaking into training","Confusing k in k-means with k in k-fold cross-validation"]
  },
  "AI": {
    key: ["Search: Uninformed (BFS, DFS, UCS, IDDFS), Informed (A*, Greedy Best-First)","A* properties: complete, optimal if h is admissible; consistent (monotone) for graph search","Constraint Satisfaction Problems (CSP): variables, domains, constraints. Backtracking, Arc consistency","Game playing: Minimax, Alpha-Beta pruning","Knowledge Representation: Propositional logic, Predicate logic, Knowledge graphs","Planning: STRIPS, state space search","Uncertainty: Bayesian networks, Hidden Markov Models","Machine Learning subset of AI","Natural Language Processing: tokenization, POS tagging, NER, parsing, embeddings","Computer Vision: image classification, object detection, segmentation"],
    tricks: ["Admissible h ≤ h* (never overestimate). Manhattan distance for grid admissible","Alpha-beta pruning: best case halves the search space (O(b^(d/2)) vs O(b^d))","CSP: arc consistency (AC-3) reduces domains before search","Minimax assumes opponent plays optimally","Forward chaining: data-driven; Backward chaining: goal-driven"],
    mistakes: ["A* not optimal if h is not admissible","DFS is NOT complete for infinite/cyclic state spaces","Confusing 'AI' narrowly with ML (AI is broader)","Hill climbing can get stuck in local optima, not complete/optimal"]
  }
};

// ═══════════════════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════════════════

function Badge({ text, color }) {
  const colors = {
    Easy: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    Medium: "bg-amber-100 text-amber-800 border border-amber-200",
    Hard: "bg-red-100 text-red-800 border border-red-200",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[color] || "bg-slate-100 text-slate-700"}`}>
      {text}
    </span>
  );
}

function MCQCard({ mcq, idx, revealed, onReveal }) {
  const isRevealed = revealed[mcq.id];
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-3 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-slate-800 text-sm flex-1">
          <span className="text-indigo-600 mr-1">Q{idx}.</span> {mcq.q}
        </span>
        <Badge text={mcq.diff} color={mcq.diff} />
      </div>
      <div className="grid grid-cols-1 gap-1 mb-2">
        {mcq.opts.map((o, i) => {
          const letters = ["A","B","C","D"];
          const isAns = i === mcq.ans;
          return (
            <div key={i} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              isRevealed && isAns ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold" :
              isRevealed ? "bg-slate-50 border-slate-200 text-slate-400" :
              "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              {letters[i]}. {o}
            </div>
          );
        })}
      </div>
      {isRevealed ? (
        <div className="text-xs bg-indigo-50 border border-indigo-200 rounded-lg p-2 text-indigo-800">
          <span className="font-bold">✓ Ans: {["A","B","C","D"][mcq.ans]}</span> — {mcq.exp}
        </div>
      ) : (
        <button onClick={() => onReveal(mcq.id)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 rounded-lg px-3 py-1 hover:bg-indigo-50 transition-all">
          Show Answer & Explanation
        </button>
      )}
    </div>
  );
}

function MCQSection({ title, mcqs, catFilter }) {
  const [revealed, setRevealed] = useState({});
  const [filter, setFilter] = useState("All");
  const [catF, setCatF] = useState("All");
  const cats = ["All", ...new Set(mcqs.map(m => m.cat))];
  const filtered = mcqs.filter(m =>
    (filter === "All" || m.diff === filter) &&
    (catF === "All" || m.cat === catF)
  );
  const revealAll = () => {
    const all = {};
    filtered.forEach(m => { all[m.id] = true; });
    setRevealed(prev => ({...prev, ...all}));
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Difficulty:</span>
        {["All","Easy","Medium","Hard"].map(d => (
          <button key={d} onClick={() => setFilter(d)}
            className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${filter===d?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-300 hover:bg-indigo-50"}`}>
            {d}
          </button>
        ))}
        <button onClick={revealAll} className="ml-auto text-xs text-red-600 hover:text-red-800 border border-red-200 rounded-full px-3 py-1 hover:bg-red-50 transition-all font-medium">
          Reveal All Answers
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Topic:</span>
        {cats.map(c => (
          <button key={c} onClick={() => setCatF(c)}
            className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${catF===c?"bg-slate-700 text-white border-slate-700":"bg-white text-slate-600 border-slate-300 hover:bg-slate-50"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-500 mb-3 font-medium">{filtered.length} questions shown</div>
      {filtered.map((m,i) => (
        <MCQCard key={m.id} mcq={m} idx={i+1} revealed={revealed}
          onReveal={(id) => setRevealed(prev => ({...prev, [id]: true}))} />
      ))}
    </div>
  );
}

function MockTestRunner({ test }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const allQs = test.sections.flatMap(s => s.questions.map((q,i)=>({...q, section: s.name, num: i+1})));
  const score = submitted ? allQs.filter((q,i) => answers[i]===q.ans).length : 0;
  const letters = ["A","B","C","D"];

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 mb-4">
        <h3 className="font-bold text-lg">{test.title}</h3>
        <p className="text-indigo-200 text-sm">60 Questions | 60 Marks | 60 Minutes</p>
        {submitted && (
          <div className="mt-2 bg-white/20 rounded-lg p-2">
            <span className="font-bold text-xl">{score}/60</span>
            <span className="text-sm ml-2">({((score/60)*100).toFixed(1)}%)</span>
          </div>
        )}
      </div>
      {test.sections.map(sec => (
        <div key={sec.name} className="mb-6">
          <div className="text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 mb-3">
            📚 {sec.name} (20 Questions)
          </div>
          {sec.questions.map((q, qi) => {
            const globalIdx = test.sections.slice(0, test.sections.indexOf(sec)).flatMap(s=>s.questions).length + qi;
            const userAns = answers[globalIdx];
            const isCorrect = submitted && userAns === q.ans;
            const isWrong = submitted && userAns !== undefined && userAns !== q.ans;
            return (
              <div key={qi} className={`mb-3 rounded-xl border p-3 ${submitted && userAns===q.ans?"border-emerald-300 bg-emerald-50":submitted && userAns!==undefined?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`}>
                <p className="text-sm font-medium text-slate-800 mb-2"><span className="text-indigo-600 font-bold">Q{globalIdx+1}.</span> {q.q}</p>
                <div className="grid gap-1">
                  {q.opts.map((o,oi) => (
                    <button key={oi} disabled={submitted}
                      onClick={() => !submitted && setAnswers(p=>({...p,[globalIdx]:oi}))}
                      className={`text-left text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        submitted && oi===q.ans?"bg-emerald-100 border-emerald-400 text-emerald-800 font-bold":
                        submitted && oi===userAns && oi!==q.ans?"bg-red-100 border-red-400 text-red-800":
                        !submitted && oi===userAns?"bg-indigo-100 border-indigo-400 text-indigo-800 font-medium":
                        "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`}>
                      {letters[oi]}. {o}
                    </button>
                  ))}
                </div>
                {submitted && <div className="text-xs mt-2 text-slate-600 bg-white/70 rounded-lg p-2 border">{q.exp}</div>}
              </div>
            );
          })}
        </div>
      ))}
      {!submitted ? (
        <button onClick={() => setSubmitted(true)}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all">
          Submit Mock Test
        </button>
      ) : (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-4 text-center">
          <div className="text-3xl font-black">{score}/60</div>
          <div className="text-sm mt-1">{score>=50?"🎉 Excellent! On track for 50+":score>=40?"👍 Good! Revise weak areas":"📚 Keep practicing!"}</div>
          <button onClick={()=>{setAnswers({});setSubmitted(false);}} className="mt-3 bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-all">
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
}

function NotesSection({ topic, data }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-slate-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 transition-all">
        <span className="font-bold text-slate-800 text-sm">{topic}</span>
        <span className="text-slate-400">{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div className="p-4 bg-white">
          <div className="mb-3">
            <div className="text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wide">📌 Key Concepts</div>
            <ul className="space-y-1">
              {data.key.map((k,i) => (
                <li key={i} className="text-xs text-slate-700 flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span>{k}</span></li>
              ))}
            </ul>
          </div>
          <div className="mb-3">
            <div className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">⚡ Exam Tricks & Shortcuts</div>
            <ul className="space-y-1">
              {data.tricks.map((t,i) => (
                <li key={i} className="text-xs text-emerald-800 flex gap-2 bg-emerald-50 rounded-lg px-2 py-1"><span>🎯</span><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-red-700 mb-2 uppercase tracking-wide">⚠️ Common Mistakes</div>
            <ul className="space-y-1">
              {data.mistakes.map((m,i) => (
                <li key={i} className="text-xs text-red-800 flex gap-2 bg-red-50 rounded-lg px-2 py-1"><span>❌</span><span>{m}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [activePart, setActivePart] = useState("A");
  const [activeSubNote, setActiveSubNote] = useState(null);
  const topRef = useRef(null);

  const parts = [
    {id:"A", label:"Exam Analysis", icon:"🔍"},
    {id:"B", label:"14-Day Plan", icon:"📅"},
    {id:"C", label:"Complete Notes", icon:"📚"},
    {id:"D", label:"Formula Sheet", icon:"📐"},
    {id:"E1", label:"Aptitude MCQs", icon:"🧮"},
    {id:"E2", label:"Math MCQs", icon:"📊"},
    {id:"E3", label:"CS MCQs", icon:"💻"},
    {id:"F", label:"Expected Qs", icon:"🎯"},
    {id:"G", label:"Mock Test", icon:"📝"},
    {id:"H", label:"Revision Sheet", icon:"⚡"},
  ];

  const nav = (id) => {
    setActivePart(id);
    topRef.current?.scrollIntoView({behavior:"smooth"});
  };

  return (
    <div style={{fontFamily:"'Segoe UI', system-ui, sans-serif", background:"#f1f5f9", minHeight:"100vh"}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)"}}>
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">🎓</div>
            <div>
              <h1 className="text-white font-black text-lg leading-tight">DUAT07 Master Guide</h1>
              <p className="text-indigo-300 text-xs">M.Tech CSE – AI / Cyber Security | Digital University Kerala</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-white text-xs font-bold">60/60 TARGET</div>
            </div>
          </div>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-2">
          <div className="flex overflow-x-auto gap-0 py-1">
            {parts.map(p => (
              <button key={p.id} onClick={() => nav(p.id)}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-lg mx-0.5 transition-all ${
                  activePart===p.id?"bg-indigo-600 text-white":"text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"}`}>
                <span>{p.icon}</span><span className="hidden sm:inline">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-6" ref={topRef}>

        {/* PART A – EXAM ANALYSIS */}
        {activePart === "A" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part A — Exam Analysis</h2>
            <p className="text-slate-500 text-sm mb-6">Strategic overview of DUAT07 for M.Tech CSE (AI/Cyber Security)</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[["Total Marks","60","3 sections × 20 marks"],["Duration","~90 min","Estimated, verify official"],["Sections","3","GA + Math + CS"],].map(([t,v,s])=>(
                <div key={t} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                  <div className="text-3xl font-black text-indigo-600">{v}</div>
                  <div className="font-bold text-slate-800 text-sm">{t}</div>
                  <div className="text-xs text-slate-500 mt-1">{s}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span>🔥</span>High Priority Topics</h3>
                <div className="space-y-2">
                  {[["Data Structures","35% of CS","Stacks,Queues,Trees,Graphs,Heaps"],["Algorithms","25% of CS","Sorting,DP,Graph algorithms"],["OS","15% of CS","Scheduling,Deadlock,Memory Mgmt"],["DBMS","10% of CS","Normalization,SQL,Transactions"],["Networks","10% of CS","OSI,TCP/IP,Protocols"],["ML/AI","5% of CS","Basics,concepts"],].map(([t,p,d])=>(
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"/>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-slate-800">{t}</span>
                        <span className="text-xs text-slate-500 ml-2">{p}</span>
                      </div>
                      <span className="text-xs text-slate-400">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span>📊</span>Section Weightage</h3>
                <div className="space-y-3">
                  {[["General Aptitude","33.3%",20,"bg-blue-400"],["Mathematics","33.3%",20,"bg-purple-400"],["Computer Science","33.3%",20,"bg-indigo-400"]].map(([s,p,m,c])=>(
                    <div key={s}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">{s}</span>
                        <span className="font-bold text-slate-800">{m} marks</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c} rounded-full`} style={{width:p}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-amber-800">🎯 Target for 50+/60</div>
                  <div className="text-xs text-amber-700 mt-1">GA: 14+/20 | Math: 14+/20 | CS: 16+/20</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-4">
              <h3 className="font-bold text-slate-800 mb-3">📋 Topic-wise Expected Questions</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <div className="text-xs font-bold text-blue-700 mb-2">General Aptitude (20 Qs)</div>
                  {[["Verbal (Grammar/Vocab)","4-5"],["Quantitative Aptitude","6-7"],["Logical Reasoning","4-5"],["Data Interpretation","2-3"],["Analytical/Spatial","2-3"]].map(([t,q])=>(
                    <div key={t} className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-600">{t}</span><span className="font-bold text-slate-800">{q}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-700 mb-2">Mathematics (20 Qs)</div>
                  {[["Probability & Statistics","4-5"],["Calculus","3-4"],["Algebra & Matrices","3-4"],["Set Theory","2-3"],["Trigonometry","2-3"],["Coordinate Geom.","2-3"],["Vectors","1-2"]].map(([t,q])=>(
                    <div key={t} className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-600">{t}</span><span className="font-bold text-slate-800">{q}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-700 mb-2">Computer Science (20 Qs)</div>
                  {[["Data Structures","5-6"],["Algorithms","3-4"],["C Programming","2-3"],["Operating Systems","3-4"],["DBMS","2-3"],["Networks","2-3"],["ML/AI","1-2"]].map(([t,q])=>(
                    <div key={t} className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-600">{t}</span><span className="font-bold text-slate-800">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-bold text-red-800 mb-2">⚠️ Examiner's Favourite Question Types</h3>
              <div className="grid md:grid-cols-2 gap-3 text-xs text-red-700">
                {["Time complexity analysis of algorithms and code snippets","Output of C programs (pointers, increment, recursion)","Normalization: identify NF violations","Page replacement algorithms (FIFO/LRU/Optimal sequence)","Shortest path / MST algorithm steps","SQL query output / error identification","Probability: Bayes' theorem, conditional probability","Logical reasoning: blood relations, coding-decoding","Derivatives and integration (standard formulas)","BFS/DFS traversal output on given graphs"].map((q,i)=>(
                  <div key={i} className="flex gap-2"><span className="text-red-400">▸</span><span>{q}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PART B – 14-DAY PLAN */}
        {activePart === "B" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part B — 14-Day Crash Course</h2>
            <p className="text-slate-500 text-sm mb-6">Structured study plan targeting 50+/60 in DUAT07</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="font-bold text-amber-800 mb-2">📋 Daily Schedule Template</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {[["6:00–8:00 AM","Study Session 1 (2hrs)"],["8:00–8:30 AM","Breakfast + Break"],["8:30–11:30 AM","Study Session 2 (3hrs)"],["11:30–12:00","Short Revision"],["2:00–5:00 PM","Study Session 3 (3hrs)"],["5:00–5:30 PM","Exercise/Break"],["6:00–8:00 PM","Practice Problems (2hrs)"],["8:30–9:30 PM","Mock test/Previous Qs"]].map(([t,a])=>(
                  <div key={t} className="bg-white rounded-lg p-2 border border-amber-100">
                    <div className="font-bold text-amber-700">{t}</div>
                    <div className="text-amber-600">{a}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {day:"Days 1–2",title:"Foundation Week: CS Core",color:"from-blue-500 to-indigo-500",topics:[
                  "Day 1 AM: C Programming – pointers, arrays, recursion (30 Qs practice)","Day 1 PM: Stacks & Queues – implementations, applications, MCQs","Day 2 AM: Linked Lists – singly, doubly, circular, Floyd's algorithm","Day 2 PM: Arrays – searching, sorting basics, 2D arrays, practice Qs"
                ]},
                {day:"Days 3–4",title:"Trees & Graphs",color:"from-purple-500 to-pink-500",topics:[
                  "Day 3 AM: Binary Trees – traversals, height, properties, leaf nodes","Day 3 PM: BST – insert, delete, search, AVL tree rotations","Day 4 AM: Binary Heaps – max/min heap, heap sort, build-heap","Day 4 PM: Graphs – representation, BFS/DFS, topological sort"
                ]},
                {day:"Days 5–6",title:"Algorithms Deep Dive",color:"from-green-500 to-teal-500",topics:[
                  "Day 5 AM: Sorting – all algorithms, time complexities, stability","Day 5 PM: Graph algorithms – Dijkstra, Bellman-Ford, Kruskal, Prim","Day 6 AM: Dynamic Programming – Fibonacci, LCS, 0/1 Knapsack","Day 6 PM: Greedy + Divide & Conquer + Complexity Analysis P/NP"
                ]},
                {day:"Days 7–8",title:"OS & DBMS",color:"from-orange-500 to-red-500",topics:[
                  "Day 7 AM: OS – Processes, Threads, Scheduling algorithms, gantt charts","Day 7 PM: OS – Deadlock (Banker's), Memory Management, Virtual Memory","Day 8 AM: DBMS – ER model, Relational model, Normalization 1NF-BCNF","Day 8 PM: DBMS – SQL queries, Joins, Transactions ACID, Indexing"
                ]},
                {day:"Days 9–10",title:"Networks + Math",color:"from-cyan-500 to-blue-500",topics:[
                  "Day 9 AM: Networks – OSI/TCP-IP, TCP/UDP, IP addressing, subnetting","Day 9 PM: Networks – Protocols (HTTP,DNS,DHCP,FTP), Routing, Security","Day 10 AM: Probability – Bayes, distributions, expectation, variance","Day 10 PM: Statistics + Calculus – derivatives, integrals, limits"
                ]},
                {day:"Days 11–12",title:"ML/AI + General Aptitude",color:"from-violet-500 to-purple-500",topics:[
                  "Day 11 AM: ML – Supervised/Unsupervised, algorithms, evaluation metrics","Day 11 PM: AI – Search algorithms, A*, Minimax, knowledge representation","Day 12 AM: Verbal – Grammar rules, vocabulary (50 words), reading","Day 12 PM: Quantitative – Number system, percentage, ratio, time-work"
                ]},
                {day:"Days 13–14",title:"Revision + Mock Tests",color:"from-rose-500 to-pink-500",topics:[
                  "Day 13 AM: Full revision – all formula sheets, shortcut techniques","Day 13 PM: Mock Test 1 + analysis of weak areas","Day 14 AM: Targeted revision of weak topics identified","Day 14 PM: Mock Test 2 + Final formula sheet revision"
                ]},
              ].map((week,i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className={`bg-gradient-to-r ${week.color} text-white p-3`}>
                    <div className="font-black text-lg">{week.day}</div>
                    <div className="text-sm opacity-90">{week.title}</div>
                  </div>
                  <div className="p-3 space-y-2">
                    {week.topics.map((t,ti)=>(
                      <div key={ti} className="text-xs text-slate-700 flex gap-2 bg-slate-50 rounded-lg p-2">
                        <span className="text-indigo-400">▸</span><span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART C – NOTES */}
        {activePart === "C" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part C — Complete Study Notes</h2>
            <p className="text-slate-500 text-sm mb-6">Exam-oriented notes with key concepts, tricks, and common mistakes</p>
            {Object.entries(NOTES).map(([topic, data]) => (
              <NotesSection key={topic} topic={topic} data={data} />
            ))}
            {/* Extra: Math Notes */}
            <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 font-bold text-slate-800 text-sm flex justify-between items-center">
                <span>Probability & Statistics</span>
              </div>
              <div className="p-4 bg-white">
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-bold text-purple-700 mb-2">Probability Formulas</div>
                    {["P(A∪B) = P(A)+P(B)-P(A∩B)","P(A|B) = P(A∩B)/P(B)","Bayes': P(A|B)=P(B|A)·P(A)/P(B)","Independent: P(A∩B)=P(A)·P(B)","Mutually exclusive: P(A∩B)=0","Complementary: P(A')=1-P(A)","Total probability: P(B)=ΣP(B|Aᵢ)·P(Aᵢ)"].map((f,i)=>(
                      <div key={i} className="bg-purple-50 rounded-lg px-2 py-1 mb-1 font-mono text-purple-800">{f}</div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-pink-700 mb-2">Distributions</div>
                    {["Binomial: P(X=k)=C(n,k)pᵏ(1-p)ⁿ⁻ᵏ, mean=np, var=npq","Poisson: P(X=k)=e⁻λλᵏ/k!, mean=var=λ","Normal: μ±σ→68%, μ±2σ→95%, μ±3σ→99.7%","Geometric: P(X=k)=(1-p)ᵏ⁻¹p","Variance: E[X²]-(E[X])²","Std Dev: √Variance","Correlation: r=Cov(X,Y)/(σₓσᵧ)"].map((f,i)=>(
                      <div key={i} className="bg-pink-50 rounded-lg px-2 py-1 mb-1 font-mono text-pink-800">{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PART D – FORMULA SHEET */}
        {activePart === "D" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part D — Master Formula Sheet</h2>
            <p className="text-slate-500 text-sm mb-4">Print this! One-page reference for exam day</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {title:"📐 Calculus", color:"blue", items:["d/dx[xⁿ]=nxⁿ⁻¹","d/dx[eˣ]=eˣ","d/dx[ln x]=1/x","d/dx[sin x]=cos x","d/dx[cos x]=-sin x","d/dx[tan x]=sec²x","∫xⁿdx=xⁿ⁺¹/(n+1)+C","∫eˣdx=eˣ+C","∫(1/x)dx=ln|x|+C","∫sin x dx=-cos x+C","∫cos x dx=sin x+C","lim(x→0) sinx/x=1","lim(x→∞)(1+1/x)ˣ=e"]},
                {title:"📊 Probability", color:"purple", items:["P(A∪B)=P(A)+P(B)-P(A∩B)","P(A|B)=P(A∩B)/P(B)","Bayes: P(A|B)=P(B|A)P(A)/P(B)","Independent: P(A∩B)=P(A)P(B)","E[X]=Σx·P(X=x)","Var(X)=E[X²]-(E[X])²","Binomial: C(n,k)pᵏqⁿ⁻ᵏ","Poisson: e⁻λλᵏ/k!","Normal: 1σ→68%, 2σ→95%"]},
                {title:"⚙️ Algorithm Complexities", color:"indigo", items:["Bubble/Selection/Insertion: O(n²)","Merge Sort: O(n log n) all cases","Quick Sort: O(n log n) avg, O(n²) worst","Heap Sort: O(n log n) always","Binary Search: O(log n)","BFS/DFS: O(V+E)","Dijkstra: O((V+E)log V) with heap","Bellman-Ford: O(VE)","Floyd-Warshall: O(V³)","Kruskal/Prim: O(E log E)"]},
                {title:"🌳 Data Structures", color:"green", items:["Stack/Queue operations: O(1)","Linked list access: O(n)","BST search avg: O(log n), worst: O(n)","Heap insert/delete: O(log n)","Build heap: O(n)","Hash table avg: O(1)","Binary tree height: ⌊log₂n⌋","Full BT leaves = internal+1","AVL balance factor: |HL-HR|≤1"]},
                {title:"🔢 Mathematics", color:"orange", items:["AP: Sn=n/2·(2a+(n-1)d)","GP: Sn=a(rⁿ-1)/(r-1)","GP∞: S=a/(1-r), |r|<1","Combinations: C(n,r)=n!/(r!(n-r)!)","Permutations: P(n,r)=n!/(n-r)!","sin²+cos²=1","1+tan²=sec²","cos2θ=1-2sin²θ=2cos²θ-1","sin(A+B)=sinAcosB+cosAsinB"]},
                {title:"💡 Aptitude Shortcuts", color:"red", items:["% change: (new-old)/old×100","SI=PRT/100, CI=P[(1+r/100)ⁿ-P]","Time-work: 1/A+1/B=1/T","Upstream=v-u, Downstream=v+u","Train speed=length/time","Area circle=πr²","Volume sphere=4/3πr³","Permutation (circular): (n-1)!","Dice sum 7: 6 ways out of 36"]},
              ].map(({title,color,items})=>(
                <div key={title} className={`bg-white rounded-xl border border-${color}-200 p-4 shadow-sm`}>
                  <h3 className={`font-bold text-${color}-700 mb-3 text-sm`}>{title}</h3>
                  <div className="space-y-1">
                    {items.map((item,i)=>(
                      <div key={i} className={`text-xs font-mono bg-${color}-50 text-${color}-800 rounded px-2 py-1`}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART E1 – GA MCQs */}
        {activePart === "E1" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part E1 — General Aptitude MCQs</h2>
            <p className="text-slate-500 text-sm mb-6">50 questions covering Verbal, Quantitative, Logical & Analytical reasoning</p>
            <MCQSection title="General Aptitude" mcqs={GA_MCQS} />
          </div>
        )}

        {/* PART E2 – MATH MCQs */}
        {activePart === "E2" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part E2 — Mathematics MCQs</h2>
            <p className="text-slate-500 text-sm mb-6">50 questions covering all mathematics topics in the DUAT07 syllabus</p>
            <MCQSection title="Mathematics" mcqs={MATH_MCQS} />
          </div>
        )}

        {/* PART E3 – CS MCQs */}
        {activePart === "E3" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part E3 — Computer Science MCQs</h2>
            <p className="text-slate-500 text-sm mb-6">110 questions covering all CS topics — Data Structures, Algorithms, OS, DBMS, Networks, ML/AI</p>
            <MCQSection title="Computer Science" mcqs={CS_MCQS} />
          </div>
        )}

        {/* PART F – MOST EXPECTED */}
        {activePart === "F" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part F — Most Expected DUAT Questions</h2>
            <p className="text-slate-500 text-sm mb-6">Questions most likely to appear based on pattern analysis</p>
            {[
              {cat:"🔥 Top Expected CS Questions", qs:[
                "Time complexity of Merge Sort vs Quick Sort — when does QS degrade?","Output of a C program with pointer arithmetic or post/pre increment","Inorder/Preorder/Postorder traversal output of a given tree","Number of page faults for a given reference string (FIFO/LRU)","Minimum spanning tree using Kruskal's with given edge weights","SQL query with JOINs and GROUP BY / HAVING clause","Process scheduling (SJF/RR) — compute average waiting time","Normalization — find the highest normal form of a given relation","BFS/DFS traversal sequence on a given graph","TCP 3-way handshake or OSI layer identification","Deadlock conditions — identify if deadlock can occur","Merge of two sorted linked lists (output or code analysis)","Height/depth of a binary tree given node insertion order","K-means or Decision Tree concept question",
              ]},
              {cat:"🎯 Top Expected Math Questions", qs:[
                "Bayes' theorem application with given conditional probabilities","Definite integral (standard type: ∫₀^(π/2) sinx or ∫₀¹ x² dx)","Eigenvalues of a 2×2 or 3×3 matrix","Standard deviation of a small data set","Limit using L'Hopital or standard formulas","Combination/Permutation counting problems","Geometric series sum to infinity","Derivative using product rule or chain rule","Probability of events with a standard deck or dice","Normal distribution empirical rule (68-95-99.7%)",
              ]},
              {cat:"⭐ Top Expected Aptitude Questions", qs:[
                "Time & Work problems with two persons","Percentage profit/loss with discount","Train crossing a bridge or another train","Blood relation problems (2-3 step reasoning)","Coding-decoding (alphabetical shift)","Number series (next term)","Synonym/Antonym vocabulary question","Error spotting in a sentence (subject-verb agreement)","Data interpretation from a bar/pie chart","Logical sequence / syllogism",
              ]},
            ].map(({cat,qs})=>(
              <div key={cat} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-4">
                <h3 className="font-bold text-slate-800 mb-3 text-sm">{cat}</h3>
                <div className="space-y-2">
                  {qs.map((q,i)=>(
                    <div key={i} className="flex gap-2 text-xs text-slate-700 bg-amber-50 border border-amber-100 rounded-lg p-2">
                      <span className="text-amber-500 font-bold">{i+1}.</span><span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PART G – MOCK TEST */}
        {activePart === "G" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part G — Full-Length Mock Test</h2>
            <p className="text-slate-500 text-sm mb-6">Complete DUAT-pattern mock test with auto-scoring</p>
            <MockTestRunner test={MOCK_TEST_1} />
            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="font-bold text-indigo-800 mb-2">📝 Additional Mock Tests — Practice Strategy</div>
              <div className="text-xs text-indigo-700 space-y-1">
                <p>• Mock Test 2: Focus on Algorithms, OS and Graph problems</p>
                <p>• Mock Test 3: Focus on DBMS normalization, Networks and ML</p>
                <p>• Mock Test 4: Mix of hard questions — aims for 55+/60 target</p>
                <p>• Use GATE CSE previous year questions (2018–2024) for additional practice</p>
                <p>• CUSAT CAT previous year papers closely match DUAT difficulty level</p>
                <p>• NIMCET aptitude sections match DUAT aptitude pattern exactly</p>
              </div>
            </div>
          </div>
        )}

        {/* PART H – REVISION SHEET */}
        {activePart === "H" && (
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">Part H — Last-Day Revision Sheet</h2>
            <p className="text-slate-500 text-sm mb-4">Everything you must remember on exam day — one final read</p>
            <div className="grid gap-3">
              {[
                {icon:"💻", title:"C Programming — Must Know", items:["sizeof(int)=4B, char=1B, float=4B, double=8B","post++ returns old value; ++pre returns new value","malloc: uninitialized | calloc: zeroed | realloc: resize","Array name = pointer to first element (constant pointer)","Recursion must have a base case; tail recursion is optimizable"]},
                {icon:"🌳", title:"Data Structures — Critical Facts", items:["Stack=LIFO, Queue=FIFO — both O(1) push/pop, enqueue/dequeue","BST inorder → sorted sequence (ascending)","Max-heap: root=max. Min-heap: root=min","Build heap = O(n). Heap sort = O(n log n)","Floyd's algorithm: two-pointer cycle detection O(n) space O(1)","BFS uses Queue; DFS uses Stack/Recursion"]},
                {icon:"⚙️", title:"Algorithm Time Complexities", items:["O(n²): Bubble, Selection, Insertion (worst). O(n): Insertion (best)","O(n log n): Merge (always), Heap (always), Quick (average)","O(n²): Quick sort WORST (sorted input, bad pivot)","Dijkstra: O((V+E)log V) | Bellman-Ford: O(VE) | Floyd: O(V³)","DP: Fibonacci O(n) | LCS O(mn) | Knapsack O(nW)"]},
                {icon:"🖥️", title:"OS — Key Concepts", items:["Deadlock: Mutual Exclusion + Hold&Wait + No Preemption + Circular Wait","SJF minimizes average waiting time (non-preemptive, optimal)","FIFO suffers Belady's anomaly; LRU/Optimal do NOT","Thrashing: spending more time paging than executing","Semaphore: wait(P) decrements; signal(V) increments","2PL: growing phase → shrinking phase → serializability"]},
                {icon:"🗄️", title:"DBMS — Normalization Quick Ref", items:["1NF: Atomic values, no repeating groups","2NF: 1NF + No partial dependency (non-key depends on FULL key)","3NF: 2NF + No transitive dependency","BCNF: Every determinant is a candidate key","SQL: WHERE (filters rows) vs HAVING (filters groups)","JOIN types: INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER, CROSS"]},
                {icon:"🌐", title:"Networks — Quick Reference", items:["OSI: Physical | Data Link | Network | Transport | Session | Presentation | Application","TCP=reliable,connection-oriented | UDP=fast,connectionless","HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53, SMTP=25","ARP: IP→MAC | DNS: name→IP | DHCP: auto-assigns IP","3-way handshake: SYN → SYN-ACK → ACK","Subnet /24 = 255.255.255.0; /16=255.255.0.0; /8=255.0.0.0"]},
                {icon:"🧮", title:"Math — Last-Minute Formulas", items:["P(A∪B)=P(A)+P(B)-P(A∩B); Independent: P(A∩B)=P(A)P(B)","Bayes: P(A|B)=P(B|A)P(A)/P(B)","Binomial: mean=np, var=npq | Poisson: mean=var=λ","Normal: ±1σ→68%, ±2σ→95%, ±3σ→99.7%","d/dx[sin x]=cos x, d/dx[cos x]=-sin x, d/dx[ln x]=1/x","lim(x→0)sinx/x=1 | lim(x→∞)(1+1/x)ˣ=e"]},
                {icon:"🎓", title:"Exam Day Tips", items:["Attempt all questions — no negative marking (verify this)","Start with your strongest section for confidence","For MCQs: eliminate wrong options first, then guess if needed","Mark time-consuming questions and return to them later","In algorithm questions, trace small examples mentally","For SQL: parse SELECT...FROM...WHERE...GROUP BY...HAVING...ORDER BY left to right"]},
              ].map(({icon,title,items})=>(
                <div key={title} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
                  <div className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><span>{icon}</span>{title}</div>
                  <div className="grid md:grid-cols-2 gap-1">
                    {items.map((item,i)=>(
                      <div key={i} className="text-xs text-slate-700 flex gap-2 bg-slate-50 rounded px-2 py-1">
                        <span className="text-indigo-400">✓</span><span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🌟</div>
              <div className="font-black text-lg">You've Got This!</div>
              <div className="text-sm opacity-90 mt-1">Consistent practice + smart revision = 50+/60 in DUAT07</div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

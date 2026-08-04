const badWords = new Set([
  // English
  'fuck', 'fuk', 'fck', 'fcuq', 'fvck', 'fack', 'fukk', 'fcuk', 'fuckk',
  'shit', 'sht', 'shyt', 'sh1t', 'shiiit',
  'bitch', 'b1tch', 'biatch', 'bich', 'btch',
  'ass', 'arse', 'asshole', 'assh0le', 'arsehole',
  'bastard', 'bstard',
  'damn', 'damm', 'dam',
  'cunt', 'cnt', 'cun7',
  'dick', 'd1ck', 'dic', 'dikk',
  'pussy', 'pussi', 'puss1', 'puss',
  'cock', 'c0ck', 'cok',
  'whore', 'wh0re', 'hore',
  'slut', 'slutt', 's1ut',
  'fag', 'faggot', 'fagot', 'f4g',
  'nigger', 'n1gga', 'nigga', 'niga', 'n1gger', 'nigg3r',
  'retard', 'ret4rd', 'retrd',
  'douche', 'douch', 'douchebag',
  'twat', 'tw4t',
  'wank', 'wanker',
  'bellend', 'bell',
  'bollocks', 'bollox',
  'bugger', 'buger',
  'knob', 'kn0b',
  'tosser',
  'prick', 'pr1ck',
  'minge',
  'nonce',
  'rape', 'raper', 'r4pe',
  'pedo', 'pedophile', 'paedo',
  'kill yourself', 'kys', 'k1ll yourself', 'kill urself',
  'suicide', 'su1cide',
  'terrorist',

  // Spanish
  'puta', 'puto', 'putita', 'putito', 'puton',
  'mierda', 'mierd', 'm13rda',
  'joder', 'jodido', 'jodete', 'j0der',
  'culo', 'cul0', 'culero',
  'pendejo', 'pend3jo', 'pndejo',
  'cabron', 'cabrón', 'cabroncito',
  'verga', 'v3rga',
  'chinga', 'chingar', 'chingada', 'chingado', 'chingatu',
  'coño', 'cono', 'cojones', 'coño e tu',
  'maricon', 'maricón', 'marica', 'marika',
  'tonto de mierda', 'idiota',
  'zorra', 'zorr0',
  'desgraciado', 'malparido', 'malparida',
  'huevon',
  'pichula', 'pichu',
  'boludo',
  'pelotudo',
  'conchatumadre', 'conchatumare', 'concha tu madre', 'conchadetumadre',
  'madre', // only when combined — handled via compound matching

  // Portuguese
  'caralho', 'car4lho', 'cralho',
  'porra', 'porr4', 'p0rra',
  'puta que pariu', 'pqp',
  'foda', 'foder', 'foda-se', 'fodase', 'fodido',
  'buceta', 'buc3t4', 'bct',
  'cu', 'cuzinho', 'cuzão',
  'viado', 'vi4do', 'veado',
  'arrombado', 'arrombada',
  'desgraçado',
  'otario', 'otário',
  'babaca', 'b4b4ca',
  'corno', 'corn0',
  'merda', 'merd', 'm3rda',
  'filho da puta', 'filho da mãe', 'fdp',
  'chupa',
  'caceta', 'cacete',

  // French
  'merde', 'm3rde',
  'putain', 'put1', 'putin',
  'salope', 'sal0pe', 'salop',
  'connard', 'connard', 'conard', 'conarde',
  'enculé', 'enculer', 'enculée',
  'batard', 'bâtard',
  'fils de pute', 'fdp',
  'ta gueule', 'ferme ta gueule', 'tg',
  'nique', 'niquer', 'nique ta mere', 'ntm',
  'bite', 'b1te',
  'couille', 'couilles', 'couillon',
  'pédé', 'p3d3',
  'salaud', 'sal0',
  'pétasse', 'petasse',
  'branleur', 'branleuse',
  '¡diot', 'idiote',
  'con', 'conne',
  'va te faire foutre', 'vtff',
  'trou du cul',

  // German
  'scheiße', 'scheisse', 'scheise', 'sch3iss3', 'scheiße', 'scheiss',
  'ficken', 'fick', 'f1cken', 'ficker',
  'arsch', 'arschloch', 'arsloch',
  'hurensohn', 'huso', 'huren', 'hure',
  'wichser', 'wichs', 'w1chser',
  'drecksau', 'dreck',
  'nutte', 'nutt3',
  'fotze', 'fotz', 'f0tze',
  'schlampe', 'schl4mpe',
  'miststück',
  'bastard', 'b4st4rd',
  'hackfresse',
  'missgeburt',
  'verpiss',
  'lecke mich', 'leck mich',
  'halt die fresse', 'halt dein maul',
  'spasti', 'spast',

  // Italian
  'cazzo', 'cazz0', 'kazzo',
  'stronzo', 'str0nzo', 'stronzata',
  'merda', 'm3rda',
  'porco dio', 'porco',
  'vaffanculo', 'fanculo', 'vaff',
  'figa', 'f1ga',
  'troia', 'troja',
  'bastardo', 'b4st4rdo',
  'puttana', 'puttan4', 'putt',
  'testa di cazzo', 'testa di merda',
  'minchia', 'm1nchia',
  'cornuto', 'cornuta',
  'sborra', 'sborro',
  'frocio', 'fr0cio',
  'imbecille', 'imb3cille',
  'cretino', 'cr3tino',

  // Russian (transliterated)
  'blyat', 'blyad', 'blya', 'blin', 'blat',
  'suka', 'cyka', 'suca', 'sucka', 'suk4',
  'pizda', 'pizdets', 'pizdec', 'pizd', 'p1zda',
  'huy', 'hui', 'hui tebe', 'huyna', 'huylo',
  'ebat', 'ebal', 'ebanyi', 'yebat', 'ebany',
  'nahui', 'nahuy', 'poshel na hui',
  'pidor', 'pidaras', 'p1d0r',
  'mraz', 'mrazi',
  'dolboeb', 'dolbaeb',
  'zhopa', 'zh0pa',
  'mudak', 'mudilo',
  'chmo', 'chm0',
  'debil', 'deb1l', 'debiloid',
  'govno', 'gavno', 'g0vno',
  'ublyudok', 'ubliudok',
  'svoloch', 'svaloch',
  'padla',
  'chert', 'chort',
  'eblan',
  'pecal', 'peedal',

  // Arabic (transliterated)
  'kos omak', 'kosomak', 'kosom', 'kos ommak', 'koss',
  'sharmoota', 'sharmuta', 'sharmoot', 'sharmu7a',
  'ahbal', 'ahb4l',
  'haywan', 'hayawaan',
  'khara', 'kh4ra',
  'er', 'eer', 'ayre', 'airi',
  'zan', 'zann',
  'khanzeer', 'kh4nzeer',
  'manak', 'mannak',
  'kaffir',
  'baidha',
  'gahsh',
  'hmar', '7mar',
  'zeneb',

  // Hindi/Urdu (transliterated)
  'madarchod', 'madarch0d', 'mdrchod', 'mc', 'madarchot',
  'bhenchod', 'behenchod', 'bhenchod', 'bhnchod', 'bc', 'behen',
  'chutiya', 'chutiy', 'chutia', 'chutiye', 'chutiyaa',
  'harami', 'har4mi', 'haraami',
  'saala', 'sala', 's4ala',
  'gandu', 'g4ndu', 'gaandu', 'gand',
  'laude', 'laudey',
  'bhosdike', 'bosdike', 'bosdk', 'bsdk',
  'randi', 'r4ndi', 'raand',
  'maa ki chut', 'maaki',
  'teri maa ki', 'teri maa',
  'tatti',
  'kutta', 'kutti', 'kutte',
  'naale',
  'nakarchod',
  'bakland', 'baklol',

  // Dutch
  'kut', 'kutwijf', 'kuthoer',
  'klootzak', 'kloot',
  'lul', 'lulletje',
  'hoer', 'h0er', 'hoeren',
  'tering', 'teringlijer',
  'tyfus', 'tyfuslijer',
  'kankerlijer', 'kanker', 'kkr',
  'flikker',
  'opdonderen',
  'rot op',

  // Turkish
  'amk', 'amina koyim', 'amina koyayim', 'amına koyim',
  'amcik', 'amcık',
  'siktir', 'siktir git', 'sik', 's1ktir',
  'yarrak', 'yarak', 'y4rrak',
  'orospu', 'orospu çocuğu', 'orospu cocugu',
  'pic', 'piç', 'p1c',
  'göt', 'got', 'g0t',
  'ananı sikim', 'ananı',
  'ibne', '1bne',
  'kahpe', 'kahp3',
  'serefsiz', 'şerefsiz',
  'mal', 'm4l',
  'dingil',

  // Polish
  'kurwa', 'krv', 'k4rwa', 'kurw',
  'chuj', 'huj', 'chui', 'chu1',
  'pierdol', 'pierdole', 'pierdolic',
  'jebany', 'jebac', 'jebany', 'j3bac',
  'spierdalaj', 'spierdal',
  'cipa', 'cipka',
  'debil', 'deb1l',
  'skurwysyn', 'skurwy',
  'zajebany',
  'popierdolony',
  'suka', 'suczka',
  'szmata', 'szm4ta',
  'dupa',
  'gówno', 'gowno',
  'pizda',

  // Chinese (pinyin transliterated)
  'cao ni ma', 'caonima', 'cnm', 'c4onima',
  'ta ma de', 'tmd', 'tamade',
  'gan', 'gann',
  'sha bi', 'shabi',
  'ji ba', 'jiba', 'jb',
  'wocao', 'wo cao',
  'bici',
  'shenjingbing',

  // Japanese (romaji)
  'kuso', 'kus0',
  'bakayaro', 'baka', 'bak4',
  'shine', 'shinee', 'sh1ne',
  'teme', 'temee',
  'kusottare',
  'chikusho',
  'fakku', 'faaaku',

  // Korean (romanized)
  'ssibal', 'sibal', 'shibal', 'ss1bal',
  'gaesekki', 'gaesaekki', 'geseki', 'gae',
  'jot', 'jotg',
  'byeongsin', 'byungshin', 'b1ngshin',
  'niga', 'nigga',
  'michin', 'm1chin',

  // Filipino / Tagalog
  'putangina', 'putang ina', 'ptngina', 'tangina', 'tang ina',
  'gago', 'g4go',
  'bobo', 'b0bo',
  'ulol', 'ul0l',
  'tarantado',
  'lintik',
  'punyeta',
  'pakyu',
  'hayop',
  'hunghang',

  // Vietnamese
  'dcm', 'du ma', 'he moma', 'djtme', 'dit me',
  'cai lon', 'cailon',
  'buoi', 'b`buồi',
  'clgt', 'clg',
  'vl',

  // Greek (transliterated)
  'malaka', 'mal4ka', 'malakas',
  'skata', 'sk4ta',
  'pousti', 'pourstis',
  'gamiso', 'gamw',
  'archidi', 'arch1di',
  'vlaka',

  // Thai (transliterated)
  'hee', 'haaa', 'hee-a',
  'kuy', 'kooey',
  'yet', 'yedd',
  'ai sat', 'aisat',
  'hiey',

  // Swedish/Norwegian/Danish
  'fitta', 'f1tta',
  'kuk', 'kukk',
  'jävla', 'javla', 'jævla',
  'helvete', 'helvette',
  'faen', 'faenskap',
  'dritt',
  'hora',
  'satan',

  // Romanian
  'futu-i', 'futui', 'fut',
  'morții', 'mortii', 'mortilor',
  'pula', 'pul4',
  'coaie', 'coae',
  'curva', 'curv4',
  'băga-mi-aș', 'baga-mi',
  'muie', 'muist',
  'tigan', 'țigan',
  'sa-mi bag', 'să-mi bag',

  // Hungarian
  'fasz', 'f4sz',
  'geci', 'gec1',
  'kúrva', 'kurva', 'kúrva',
  'anya', 'anyádat', 'anyad',
  'baszd', 'baszd meg', 'baszdmeg',
  'lofasz', 'lófasz',
  'picsa',
  'szar', 'sz4r',
  'hulye',

  // Czech / Slovak
  'kurva', 'k4rva',
  'pica', 'pi4a',
  'jebat', 'j3bat',
  'debil', 'deb1l',
  'kokot', 'k0kot',
  'buzna', 'bu4na',
  'sral',
  'hovno',

  // Thai
  'yet mae', 'yetmae',
  'ai hia', 'aihia',

  // Indonesian / Malay
  'anjing', 'anj1ng', 'anjg', 'anjir', 'anjrit', 'anying',
  'bangsat', 'b4ngsat', 'bngst',
  'babi', 'bab1', 'b4bi',
  'goblok', 'g0blok', 'goblog',
  'tolol', 'tol0l',
  'setan', 's3tan',
  'brengsek', 'brengs3k',
  'kampret', 'kampang',
  'bego', 'b3go',
  'kontol', 'k0ntol', 'kontl',
  'memek', 'mmek', 'mmk',
  'jancok', 'j4ncok', 'cok', 'jancuk',
  'ngentot', 'ngent0t', 'nntot',
  'peler', 'p3ler',
  'keparat', 'k3parat',
  'taik', 'ta1k', 'tai',
  'asw', 'asu', '4su',
  'bgst', 'bgsd',
  'jembut', 'j3mbut',

  // Common international slurs
  'kike',
  'spic',
  'gook',
  'chink', 'ch1nk',
  'kafir',
  'wop',
  'cracker', // might be contested; included for comprehensiveness
  'honky',
  'raghead',
  'towelhead',
  'sand nigger',
  'camel jockey',
  'paki', 'p4ki',
  'heeb',
  'beaner',
  'wetback',
]);

const leetMap = {
  '0': 'o',
  '1': 'i',
  '2': 'z',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '6': 'g',
  '7': 't',
  '8': 'b',
  '9': 'g',
  '@': 'a',
  '!': 'i',
  '$': 's',
  '+': 't',
  '(': 'c',
};

function normalizeWord(word) {
  let normalized = word.toLowerCase();
  for (const [leet, normal] of Object.entries(leetMap)) {
    normalized = normalized.replace(new RegExp(leet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), normal);
  }
  return normalized;
}

function checkText(text) {
  if (!text) return { found: false };

  const cleaned = text.toLowerCase().replace(/[\u200B-\u200D\uFEFF]/g, '');
  const normalized = normalizeWord(cleaned);

  const words = normalized.split(/[\s\-_.,!?;:'"()\[\]{}<>\/\\|@#$%^&*+=~`\u2000-\u206F]+/)
    .filter(w => w.length > 0);

  for (const word of words) {
    if (badWords.has(word)) {
      return { found: true, word };
    }
  }

  for (const word of words) {
    if (word.length < 3) continue;
    for (const bad of badWords) {
      if (bad.includes(' ')) continue;
      const compactBad = bad.replace(/[^a-z]/g, '');
      if (compactBad.length < 4) continue;
      if (word.length > compactBad.length + 3) continue;
      if (word.startsWith(compactBad) || word.endsWith(compactBad)) {
        return { found: true, word: bad };
      }
    }
  }

  const compact = normalized.replace(/[^a-z]/g, '');
  for (const bad of badWords) {
    if (!bad.includes(' ')) continue;
    const compactBad = bad.replace(/[^a-z]/g, '');
    if (compactBad.length >= 4 && compact.includes(compactBad)) {
      return { found: true, word: bad };
    }
  }

  return { found: false };
}

module.exports = { badWords, checkText, normalizeWord };

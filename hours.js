var hours_data = [];
var utc_data = [];
let updating = false;
let total_count = 0;
var contries;
var sortedCountries;
var countryCounts = {};
const scrollContainer = document.querySelector(".div-block-3");

function getTimezoneOffset(timeZone) {
  const now = new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = diff + now.getTimezoneOffset() / 60;

  return offset;
}

// function populateAllHours() {
//   const currentHourData = {};

//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute++) {
//       const time = `${hour.toString().padStart(2, "0")}:${minute
//         .toString()
//         .padStart(2, "0")}:00`;

//       currentHourData[time] = hours_data[time];
//     }
//   }
//   myChartObj.data.labels = Object.keys(currentHourData).map((time) => {
//     let hour = parseInt(time.slice(0, 2));
//     let period = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour.toString().padStart(2, "0")}:${time.slice(3, 5)} ${period}`;
//   });
//   myChartObj.data.datasets[0].data = Object.values(currentHourData).map(
//     (val) => {
//       return Math.floor(Math.random() * 50);
//     }
//   );
//   myChartObj.update();
// }

function filterSingleHout(hour) {
  const currentHourData = {};
  for (let hours = hour - 1; hours < parseInt(hour) + 2; hours++) {
    let hour_ = hours;
    if (hour_ < 0) {
      hour_ = 24 + hour_;
    }
    if (hour_ > 23) {
      hour_ = hour_ - 24;
    }
    for (let minute = 0; minute < 60; minute++) {
      const time = `${hour_.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`;
      currentHourData[time] = hours_data[time];
    }
  }

  myChartObj.data.labels = Object.keys(currentHourData).map((time) => {
    let hour = parseInt(time.slice(0, 2));
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${time.slice(
      3,
      5
    )} ${period}    ⎯⎯⎯`;
  });
  myChartObj.data.datasets[0].data = Object.values(currentHourData).map(
    (val) => {
      // return Math.floor(Math.random() * 50);
      return val;
    }
  );
  updating = true;
  myChartObj.update();
  setTimeout(() => {
    updating = false;
  }, 900);

  // Scroll to horizontal center
  scrollContainer.scrollLeft =
    (scrollContainer.scrollWidth - scrollContainer.offsetWidth) / 2;
}

const countries = [
  {
    name: {
      common: "Moldova",
      official: "Republic of Moldova",
      nativeName: { ron: { official: "Republica Moldova", common: "Moldova" } },
    },
  },
  {
    name: {
      common: "United States",
      official: "United States of America",
      nativeName: {
        eng: { official: "United States of America", common: "United States" },
      },
    },
  },
  {
    name: {
      common: "Mayotte",
      official: "Department of Mayotte",
      nativeName: {
        fra: { official: "Département de Mayotte", common: "Mayotte" },
      },
    },
  },
  {
    name: {
      common: "Nauru",
      official: "Republic of Nauru",
      nativeName: {
        eng: { official: "Republic of Nauru", common: "Nauru" },
        nau: { official: "Republic of Nauru", common: "Nauru" },
      },
    },
  },
  {
    name: {
      common: "Mozambique",
      official: "Republic of Mozambique",
      nativeName: {
        por: { official: "República de Moçambique", common: "Moçambique" },
      },
    },
  },
  {
    name: {
      common: "Brazil",
      official: "Federative Republic of Brazil",
      nativeName: {
        por: { official: "República Federativa do Brasil", common: "Brasil" },
      },
    },
  },
  {
    name: {
      common: "Cape Verde",
      official: "Republic of Cabo Verde",
      nativeName: {
        por: { official: "República de Cabo Verde", common: "Cabo Verde" },
      },
    },
  },
  {
    name: {
      common: "Equatorial Guinea",
      official: "Republic of Equatorial Guinea",
      nativeName: {
        fra: {
          official: "République de la Guinée Équatoriale",
          common: "Guinée équatoriale",
        },
        por: {
          official: "República da Guiné Equatorial",
          common: "Guiné Equatorial",
        },
        spa: {
          official: "República de Guinea Ecuatorial",
          common: "Guinea Ecuatorial",
        },
      },
    },
  },
  {
    name: {
      common: "Albania",
      official: "Republic of Albania",
      nativeName: {
        sqi: { official: "Republika e Shqipërisë", common: "Shqipëria" },
      },
    },
  },
  {
    name: {
      common: "United States Virgin Islands",
      official: "Virgin Islands of the United States",
      nativeName: {
        eng: {
          official: "Virgin Islands of the United States",
          common: "United States Virgin Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Niue",
      official: "Niue",
      nativeName: {
        eng: { official: "Niue", common: "Niue" },
        niu: { official: "Niuē", common: "Niuē" },
      },
    },
  },
  {
    name: {
      common: "Palau",
      official: "Republic of Palau",
      nativeName: {
        eng: { official: "Republic of Palau", common: "Palau" },
        pau: { official: "Beluu er a Belau", common: "Belau" },
      },
    },
  },
  {
    name: {
      common: "Nigeria",
      official: "Federal Republic of Nigeria",
      nativeName: {
        eng: { official: "Federal Republic of Nigeria", common: "Nigeria" },
      },
    },
  },
  {
    name: {
      common: "British Virgin Islands",
      official: "Virgin Islands",
      nativeName: {
        eng: { official: "Virgin Islands", common: "British Virgin Islands" },
      },
    },
  },
  {
    name: {
      common: "Gambia",
      official: "Republic of the Gambia",
      nativeName: {
        eng: { official: "Republic of the Gambia", common: "Gambia" },
      },
    },
  },
  {
    name: {
      common: "Somalia",
      official: "Federal Republic of Somalia",
      nativeName: {
        ara: { official: "جمهورية الصومال‎‎", common: "الصومال‎‎" },
        som: {
          official: "Jamhuuriyadda Federaalka Soomaaliya",
          common: "Soomaaliya",
        },
      },
    },
  },
  {
    name: {
      common: "Yemen",
      official: "Republic of Yemen",
      nativeName: { ara: { official: "الجمهورية اليمنية", common: "اليَمَن" } },
    },
  },
  {
    name: {
      common: "Malaysia",
      official: "Malaysia",
      nativeName: {
        eng: { official: "Malaysia", common: "Malaysia" },
        msa: { official: "مليسيا", common: "مليسيا" },
      },
    },
  },
  {
    name: {
      common: "Dominica",
      official: "Commonwealth of Dominica",
      nativeName: {
        eng: { official: "Commonwealth of Dominica", common: "Dominica" },
      },
    },
  },
  {
    name: {
      common: "United Kingdom",
      official: "United Kingdom of Great Britain and Northern Ireland",
      nativeName: {
        eng: {
          official: "United Kingdom of Great Britain and Northern Ireland",
          common: "United Kingdom",
        },
      },
    },
  },
  {
    name: {
      common: "Madagascar",
      official: "Republic of Madagascar",
      nativeName: {
        fra: { official: "République de Madagascar", common: "Madagascar" },
        mlg: { official: "Repoblikan'i Madagasikara", common: "Madagasikara" },
      },
    },
  },
  {
    name: {
      common: "Western Sahara",
      official: "Sahrawi Arab Democratic Republic",
      nativeName: {
        ber: {
          official: "Sahrawi Arab Democratic Republic",
          common: "Western Sahara",
        },
        mey: {
          official: "الجمهورية العربية الصحراوية الديمقراطية",
          common: "الصحراء الغربية",
        },
        spa: {
          official: "República Árabe Saharaui Democrática",
          common: "Sahara Occidental",
        },
      },
    },
  },
  {
    name: {
      common: "Cyprus",
      official: "Republic of Cyprus",
      nativeName: {
        ell: { official: "Δημοκρατία της Κύπρος", common: "Κύπρος" },
        tur: { official: "Kıbrıs Cumhuriyeti", common: "Kıbrıs" },
      },
    },
  },
  {
    name: {
      common: "Antigua and Barbuda",
      official: "Antigua and Barbuda",
      nativeName: {
        eng: { official: "Antigua and Barbuda", common: "Antigua and Barbuda" },
      },
    },
  },
  {
    name: {
      common: "Ireland",
      official: "Republic of Ireland",
      nativeName: {
        eng: { official: "Republic of Ireland", common: "Ireland" },
        gle: { official: "Poblacht na hÉireann", common: "Éire" },
      },
    },
  },
  {
    name: {
      common: "Paraguay",
      official: "Republic of Paraguay",
      nativeName: {
        grn: { official: "Tetã Paraguái", common: "Paraguái" },
        spa: { official: "República de Paraguay", common: "Paraguay" },
      },
    },
  },
  {
    name: {
      common: "Sri Lanka",
      official: "Democratic Socialist Republic of Sri Lanka",
      nativeName: {
        sin: {
          official: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය",
          common: "ශ්‍රී ලංකාව",
        },
        tam: { official: "இலங்கை சனநாயக சோசலிசக் குடியரசு", common: "இலங்கை" },
      },
    },
  },
  {
    name: {
      common: "South Africa",
      official: "Republic of South Africa",
      nativeName: {
        afr: { official: "Republiek van Suid-Afrika", common: "South Africa" },
        eng: { official: "Republic of South Africa", common: "South Africa" },
        nbl: {
          official: "IRiphabliki yeSewula Afrika",
          common: "Sewula Afrika",
        },
        nso: {
          official: "Rephaboliki ya Afrika-Borwa ",
          common: "Afrika-Borwa",
        },
        sot: {
          official: "Rephaboliki ya Afrika Borwa",
          common: "Afrika Borwa",
        },
        ssw: {
          official: "IRiphabhulikhi yeNingizimu Afrika",
          common: "Ningizimu Afrika",
        },
        tsn: {
          official: "Rephaboliki ya Aforika Borwa",
          common: "Aforika Borwa",
        },
        tso: {
          official: "Riphabliki ra Afrika Dzonga",
          common: "Afrika Dzonga",
        },
        ven: {
          official: "Riphabuḽiki ya Afurika Tshipembe",
          common: "Afurika Tshipembe",
        },
        xho: {
          official: "IRiphabliki yaseMzantsi Afrika",
          common: "Mzantsi Afrika",
        },
        zul: {
          official: "IRiphabliki yaseNingizimu Afrika",
          common: "Ningizimu Afrika",
        },
      },
    },
  },
  {
    name: {
      common: "Kuwait",
      official: "State of Kuwait",
      nativeName: { ara: { official: "دولة الكويت", common: "الكويت" } },
    },
  },
  {
    name: {
      common: "Algeria",
      official: "People's Democratic Republic of Algeria",
      nativeName: {
        ara: {
          official: "الجمهورية الديمقراطية الشعبية الجزائرية",
          common: "الجزائر",
        },
      },
    },
  },
  {
    name: {
      common: "Croatia",
      official: "Republic of Croatia",
      nativeName: {
        hrv: { official: "Republika Hrvatska", common: "Hrvatska" },
      },
    },
  },
  {
    name: {
      common: "Martinique",
      official: "Martinique",
      nativeName: { fra: { official: "Martinique", common: "Martinique" } },
    },
  },
  {
    name: {
      common: "Sierra Leone",
      official: "Republic of Sierra Leone",
      nativeName: {
        eng: { official: "Republic of Sierra Leone", common: "Sierra Leone" },
      },
    },
  },
  {
    name: {
      common: "Northern Mariana Islands",
      official: "Commonwealth of the Northern Mariana Islands",
      nativeName: {
        cal: {
          official: "Commonwealth of the Northern Mariana Islands",
          common: "Northern Mariana Islands",
        },
        cha: {
          official: "Sankattan Siha Na Islas Mariånas",
          common: "Na Islas Mariånas",
        },
        eng: {
          official: "Commonwealth of the Northern Mariana Islands",
          common: "Northern Mariana Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Rwanda",
      official: "Republic of Rwanda",
      nativeName: {
        eng: { official: "Republic of Rwanda", common: "Rwanda" },
        fra: { official: "République rwandaise", common: "Rwanda" },
        kin: { official: "Repubulika y'u Rwanda", common: "Rwanda" },
      },
    },
  },
  {
    name: {
      common: "Syria",
      official: "Syrian Arab Republic",
      nativeName: {
        ara: { official: "الجمهورية العربية السورية", common: "سوريا" },
      },
    },
  },
  {
    name: {
      common: "Saint Vincent and the Grenadines",
      official: "Saint Vincent and the Grenadines",
      nativeName: {
        eng: {
          official: "Saint Vincent and the Grenadines",
          common: "Saint Vincent and the Grenadines",
        },
      },
    },
  },
  {
    name: {
      common: "Kosovo",
      official: "Republic of Kosovo",
      nativeName: {
        sqi: { official: "Republika e Kosovës", common: "Kosova" },
        srp: { official: "Република Косово", common: "Косово" },
      },
    },
  },
  {
    name: {
      common: "Saint Lucia",
      official: "Saint Lucia",
      nativeName: { eng: { official: "Saint Lucia", common: "Saint Lucia" } },
    },
  },
  {
    name: {
      common: "Honduras",
      official: "Republic of Honduras",
      nativeName: {
        spa: { official: "República de Honduras", common: "Honduras" },
      },
    },
  },
  {
    name: {
      common: "Jordan",
      official: "Hashemite Kingdom of Jordan",
      nativeName: {
        ara: { official: "المملكة الأردنية الهاشمية", common: "الأردن" },
      },
    },
  },
  {
    name: {
      common: "Tuvalu",
      official: "Tuvalu",
      nativeName: {
        eng: { official: "Tuvalu", common: "Tuvalu" },
        tvl: { official: "Tuvalu", common: "Tuvalu" },
      },
    },
  },
  {
    name: {
      common: "Nepal",
      official: "Federal Democratic Republic of Nepal",
      nativeName: {
        nep: { official: "नेपाल संघीय लोकतान्त्रिक गणतन्त्र", common: "नेपाल" },
      },
    },
  },
  {
    name: {
      common: "Liberia",
      official: "Republic of Liberia",
      nativeName: {
        eng: { official: "Republic of Liberia", common: "Liberia" },
      },
    },
  },
  {
    name: {
      common: "Heard Island and McDonald Islands",
      official: "Heard Island and McDonald Islands",
      nativeName: {
        eng: {
          official: "Heard Island and McDonald Islands",
          common: "Heard Island and McDonald Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Austria",
      official: "Republic of Austria",
      nativeName: {
        bar: { official: "Republik Österreich", common: "Österreich" },
      },
    },
  },
  {
    name: {
      common: "Guernsey",
      official: "Bailiwick of Guernsey",
      nativeName: {
        eng: { official: "Bailiwick of Guernsey", common: "Guernsey" },
        fra: { official: "Bailliage de Guernesey", common: "Guernesey" },
        nfr: { official: "Dgèrnésiais", common: "Dgèrnésiais" },
      },
    },
  },
  {
    name: {
      common: "Central African Republic",
      official: "Central African Republic",
      nativeName: {
        fra: {
          official: "République centrafricaine",
          common: "République centrafricaine",
        },
        sag: { official: "Ködörösêse tî Bêafrîka", common: "Bêafrîka" },
      },
    },
  },
  {
    name: {
      common: "Mauritania",
      official: "Islamic Republic of Mauritania",
      nativeName: {
        ara: {
          official: "الجمهورية الإسلامية الموريتانية",
          common: "موريتانيا",
        },
      },
    },
  },
  {
    name: {
      common: "Djibouti",
      official: "Republic of Djibouti",
      nativeName: {
        ara: { official: "جمهورية جيبوتي", common: "جيبوتي‎" },
        fra: { official: "République de Djibouti", common: "Djibouti" },
      },
    },
  },
  {
    name: {
      common: "Fiji",
      official: "Republic of Fiji",
      nativeName: {
        eng: { official: "Republic of Fiji", common: "Fiji" },
        fij: { official: "Matanitu Tugalala o Viti", common: "Viti" },
        hif: { official: "रिपब्लिक ऑफ फीजी", common: "फिजी" },
      },
    },
  },
  {
    name: {
      common: "Norway",
      official: "Kingdom of Norway",
      nativeName: {
        nno: { official: "Kongeriket Noreg", common: "Noreg" },
        nob: { official: "Kongeriket Norge", common: "Norge" },
        smi: { official: "Norgga gonagasriika", common: "Norgga" },
      },
    },
  },
  {
    name: {
      common: "Latvia",
      official: "Republic of Latvia",
      nativeName: {
        lav: { official: "Latvijas Republikas", common: "Latvija" },
      },
    },
  },
  {
    name: {
      common: "Falkland Islands",
      official: "Falkland Islands",
      nativeName: {
        eng: { official: "Falkland Islands", common: "Falkland Islands" },
      },
    },
  },
  {
    name: {
      common: "Kazakhstan",
      official: "Republic of Kazakhstan",
      nativeName: {
        kaz: { official: "Қазақстан Республикасы", common: "Қазақстан" },
        rus: { official: "Республика Казахстан", common: "Казахстан" },
      },
    },
  },
  {
    name: {
      common: "Åland Islands",
      official: "Åland Islands",
      nativeName: { swe: { official: "Landskapet Åland", common: "Åland" } },
    },
  },
  {
    name: {
      common: "Turkmenistan",
      official: "Turkmenistan",
      nativeName: {
        rus: { official: "Туркменистан", common: "Туркмения" },
        tuk: { official: "Türkmenistan", common: "Türkmenistan" },
      },
    },
  },
  {
    name: {
      common: "Cocos (Keeling) Islands",
      official: "Territory of the Cocos (Keeling) Islands",
      nativeName: {
        eng: {
          official: "Territory of the Cocos (Keeling) Islands",
          common: "Cocos (Keeling) Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Bulgaria",
      official: "Republic of Bulgaria",
      nativeName: {
        bul: { official: "Република България", common: "България" },
      },
    },
  },
  {
    name: {
      common: "Tokelau",
      official: "Tokelau",
      nativeName: {
        eng: { official: "Tokelau", common: "Tokelau" },
        smo: { official: "Tokelau", common: "Tokelau" },
        tkl: { official: "Tokelau", common: "Tokelau" },
      },
    },
  },
  {
    name: {
      common: "New Caledonia",
      official: "New Caledonia",
      nativeName: {
        fra: { official: "Nouvelle-Calédonie", common: "Nouvelle-Calédonie" },
      },
    },
  },
  {
    name: {
      common: "Barbados",
      official: "Barbados",
      nativeName: { eng: { official: "Barbados", common: "Barbados" } },
    },
  },
  {
    name: {
      common: "São Tomé and Príncipe",
      official: "Democratic Republic of São Tomé and Príncipe",
      nativeName: {
        por: {
          official: "República Democrática do São Tomé e Príncipe",
          common: "São Tomé e Príncipe",
        },
      },
    },
  },
  { name: { common: "Antarctica", official: "Antarctica", nativeName: {} } },
  {
    name: {
      common: "Brunei",
      official: "Nation of Brunei, Abode of Peace",
      nativeName: {
        msa: {
          official: "Nation of Brunei, Abode Damai",
          common: "Negara Brunei Darussalam",
        },
      },
    },
  },
  {
    name: {
      common: "Bhutan",
      official: "Kingdom of Bhutan",
      nativeName: { dzo: { official: "འབྲུག་རྒྱལ་ཁབ་", common: "འབྲུག་ཡུལ་" } },
    },
  },
  {
    name: {
      common: "Cameroon",
      official: "Republic of Cameroon",
      nativeName: {
        eng: { official: "Republic of Cameroon", common: "Cameroon" },
        fra: { official: "République du Cameroun", common: "Cameroun" },
      },
    },
  },
  {
    name: {
      common: "Argentina",
      official: "Argentine Republic",
      nativeName: {
        grn: { official: "Argentine Republic", common: "Argentina" },
        spa: { official: "República Argentina", common: "Argentina" },
      },
    },
  },
  {
    name: {
      common: "Azerbaijan",
      official: "Republic of Azerbaijan",
      nativeName: {
        aze: { official: "Azərbaycan Respublikası", common: "Azərbaycan" },
      },
    },
  },
  {
    name: {
      common: "Mexico",
      official: "United Mexican States",
      nativeName: {
        spa: { official: "Estados Unidos Mexicanos", common: "México" },
      },
    },
  },
  {
    name: {
      common: "Morocco",
      official: "Kingdom of Morocco",
      nativeName: {
        ara: { official: "المملكة المغربية", common: "المغرب" },
        ber: { official: "ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ", common: "ⵍⵎⴰⵖⵔⵉⴱ" },
      },
    },
  },
  {
    name: {
      common: "Guatemala",
      official: "Republic of Guatemala",
      nativeName: {
        spa: { official: "República de Guatemala", common: "Guatemala" },
      },
    },
  },
  {
    name: {
      common: "Kenya",
      official: "Republic of Kenya",
      nativeName: {
        eng: { official: "Republic of Kenya", common: "Kenya" },
        swa: { official: "Republic of Kenya", common: "Kenya" },
      },
    },
  },
  {
    name: {
      common: "Malta",
      official: "Republic of Malta",
      nativeName: {
        eng: { official: "Republic of Malta", common: "Malta" },
        mlt: { official: "Repubblika ta ' Malta", common: "Malta" },
      },
    },
  },
  {
    name: {
      common: "Czechia",
      official: "Czech Republic",
      nativeName: {
        ces: { official: "Česká republika", common: "Česko" },
        slk: { official: "Česká republika", common: "Česko" },
      },
    },
  },
  {
    name: {
      common: "Gibraltar",
      official: "Gibraltar",
      nativeName: { eng: { official: "Gibraltar", common: "Gibraltar" } },
    },
  },
  {
    name: {
      common: "Aruba",
      official: "Aruba",
      nativeName: {
        nld: { official: "Aruba", common: "Aruba" },
        pap: { official: "Aruba", common: "Aruba" },
      },
    },
  },
  {
    name: {
      common: "Saint Barthélemy",
      official: "Collectivity of Saint Barthélemy",
      nativeName: {
        fra: {
          official: "Collectivité de Saint-Barthélemy",
          common: "Saint-Barthélemy",
        },
      },
    },
  },
  {
    name: {
      common: "Monaco",
      official: "Principality of Monaco",
      nativeName: {
        fra: { official: "Principauté de Monaco", common: "Monaco" },
      },
    },
  },
  {
    name: {
      common: "United Arab Emirates",
      official: "United Arab Emirates",
      nativeName: {
        ara: {
          official: "الإمارات العربية المتحدة",
          common: "دولة الإمارات العربية المتحدة",
        },
      },
    },
  },
  {
    name: {
      common: "South Sudan",
      official: "Republic of South Sudan",
      nativeName: {
        eng: { official: "Republic of South Sudan", common: "South Sudan" },
      },
    },
  },
  {
    name: {
      common: "Puerto Rico",
      official: "Commonwealth of Puerto Rico",
      nativeName: {
        eng: { official: "Commonwealth of Puerto Rico", common: "Puerto Rico" },
        spa: {
          official: "Estado Libre Asociado de Puerto Rico",
          common: "Puerto Rico",
        },
      },
    },
  },
  {
    name: {
      common: "El Salvador",
      official: "Republic of El Salvador",
      nativeName: {
        spa: { official: "República de El Salvador", common: "El Salvador" },
      },
    },
  },
  {
    name: {
      common: "France",
      official: "French Republic",
      nativeName: {
        fra: { official: "République française", common: "France" },
      },
    },
  },
  {
    name: {
      common: "Niger",
      official: "Republic of Niger",
      nativeName: { fra: { official: "République du Niger", common: "Niger" } },
    },
  },
  {
    name: {
      common: "Ivory Coast",
      official: "Republic of Côte d'Ivoire",
      nativeName: {
        fra: {
          official: "République de Côte d'Ivoire",
          common: "Côte d'Ivoire",
        },
      },
    },
  },
  {
    name: {
      common: "South Georgia",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
  },
  {
    name: {
      common: "Botswana",
      official: "Republic of Botswana",
      nativeName: {
        eng: { official: "Republic of Botswana", common: "Botswana" },
        tsn: { official: "Lefatshe la Botswana", common: "Botswana" },
      },
    },
  },
  {
    name: {
      common: "British Indian Ocean Territory",
      official: "British Indian Ocean Territory",
      nativeName: {
        eng: {
          official: "British Indian Ocean Territory",
          common: "British Indian Ocean Territory",
        },
      },
    },
  },
  {
    name: {
      common: "Uzbekistan",
      official: "Republic of Uzbekistan",
      nativeName: {
        rus: { official: "Республика Узбекистан", common: "Узбекистан" },
        uzb: { official: "O'zbekiston Respublikasi", common: "O‘zbekiston" },
      },
    },
  },
  {
    name: {
      common: "Tunisia",
      official: "Tunisian Republic",
      nativeName: { ara: { official: "الجمهورية التونسية", common: "تونس" } },
    },
  },
  {
    name: {
      common: "Hong Kong",
      official:
        "Hong Kong Special Administrative Region of the People's Republic of China",
      nativeName: {
        eng: {
          official:
            "Hong Kong Special Administrative Region of the People's Republic of China",
          common: "Hong Kong",
        },
        zho: { official: "中华人民共和国香港特别行政区", common: "香港" },
      },
    },
  },
  {
    name: {
      common: "North Macedonia",
      official: "Republic of North Macedonia",
      nativeName: {
        mkd: { official: "Република Северна Македонија", common: "Македонија" },
      },
    },
  },
  {
    name: {
      common: "Suriname",
      official: "Republic of Suriname",
      nativeName: {
        nld: { official: "Republiek Suriname", common: "Suriname" },
      },
    },
  },
  {
    name: {
      common: "Belgium",
      official: "Kingdom of Belgium",
      nativeName: {
        deu: { official: "Königreich Belgien", common: "Belgien" },
        fra: { official: "Royaume de Belgique", common: "Belgique" },
        nld: { official: "Koninkrijk België", common: "België" },
      },
    },
  },
  {
    name: {
      common: "American Samoa",
      official: "American Samoa",
      nativeName: {
        eng: { official: "American Samoa", common: "American Samoa" },
        smo: { official: "Sāmoa Amelika", common: "Sāmoa Amelika" },
      },
    },
  },
  {
    name: {
      common: "Solomon Islands",
      official: "Solomon Islands",
      nativeName: {
        eng: { official: "Solomon Islands", common: "Solomon Islands" },
      },
    },
  },
  {
    name: {
      common: "Ukraine",
      official: "Ukraine",
      nativeName: { ukr: { official: "Україна", common: "Україна" } },
    },
  },
  {
    name: {
      common: "Finland",
      official: "Republic of Finland",
      nativeName: {
        fin: { official: "Suomen tasavalta", common: "Suomi" },
        swe: { official: "Republiken Finland", common: "Finland" },
      },
    },
  },
  {
    name: {
      common: "Burkina Faso",
      official: "Burkina Faso",
      nativeName: {
        fra: { official: "République du Burkina", common: "Burkina Faso" },
      },
    },
  },
  {
    name: {
      common: "Bosnia and Herzegovina",
      official: "Bosnia and Herzegovina",
      nativeName: {
        bos: { official: "Bosna i Hercegovina", common: "Bosna i Hercegovina" },
        hrv: { official: "Bosna i Hercegovina", common: "Bosna i Hercegovina" },
        srp: { official: "Босна и Херцеговина", common: "Босна и Херцеговина" },
      },
    },
  },
  {
    name: {
      common: "Iran",
      official: "Islamic Republic of Iran",
      nativeName: { fas: { official: "جمهوری اسلامی ایران", common: "ایران" } },
    },
  },
  {
    name: {
      common: "Cuba",
      official: "Republic of Cuba",
      nativeName: { spa: { official: "República de Cuba", common: "Cuba" } },
    },
  },
  {
    name: {
      common: "Eritrea",
      official: "State of Eritrea",
      nativeName: {
        ara: { official: "دولة إرتريا", common: "إرتريا‎" },
        eng: { official: "State of Eritrea", common: "Eritrea" },
        tir: { official: "ሃገረ ኤርትራ", common: "ኤርትራ" },
      },
    },
  },
  {
    name: {
      common: "Slovakia",
      official: "Slovak Republic",
      nativeName: {
        slk: { official: "Slovenská republika", common: "Slovensko" },
      },
    },
  },
  {
    name: {
      common: "Lithuania",
      official: "Republic of Lithuania",
      nativeName: {
        lit: { official: "Lietuvos Respublikos", common: "Lietuva" },
      },
    },
  },
  {
    name: {
      common: "Saint Martin",
      official: "Saint Martin",
      nativeName: { fra: { official: "Saint-Martin", common: "Saint-Martin" } },
    },
  },
  {
    name: {
      common: "Pitcairn Islands",
      official: "Pitcairn Group of Islands",
      nativeName: {
        eng: {
          official: "Pitcairn Group of Islands",
          common: "Pitcairn Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Guinea-Bissau",
      official: "Republic of Guinea-Bissau",
      nativeName: {
        por: { official: "República da Guiné-Bissau", common: "Guiné-Bissau" },
        pov: { official: "República da Guiné-Bissau", common: "Guiné-Bissau" },
      },
    },
  },
  {
    name: {
      common: "Montserrat",
      official: "Montserrat",
      nativeName: { eng: { official: "Montserrat", common: "Montserrat" } },
    },
  },
  {
    name: {
      common: "Turkey",
      official: "Republic of Turkey",
      nativeName: {
        tur: { official: "Türkiye Cumhuriyeti", common: "Türkiye" },
      },
    },
  },
  {
    name: {
      common: "Philippines",
      official: "Republic of the Philippines",
      nativeName: {
        eng: { official: "Republic of the Philippines", common: "Philippines" },
        fil: { official: "Republic of the Philippines", common: "Pilipinas" },
      },
    },
  },
  {
    name: {
      common: "Vanuatu",
      official: "Republic of Vanuatu",
      nativeName: {
        bis: { official: "Ripablik blong Vanuatu", common: "Vanuatu" },
        eng: { official: "Republic of Vanuatu", common: "Vanuatu" },
        fra: { official: "République de Vanuatu", common: "Vanuatu" },
      },
    },
  },
  {
    name: {
      common: "Bolivia",
      official: "Plurinational State of Bolivia",
      nativeName: {
        aym: { official: "Wuliwya Suyu", common: "Wuliwya" },
        grn: { official: "Tetã Volívia", common: "Volívia" },
        que: { official: "Buliwya Mamallaqta", common: "Buliwya" },
        spa: { official: "Estado Plurinacional de Bolivia", common: "Bolivia" },
      },
    },
  },
  {
    name: {
      common: "Saint Kitts and Nevis",
      official: "Federation of Saint Christopher and Nevis",
      nativeName: {
        eng: {
          official: "Federation of Saint Christopher and Nevis",
          common: "Saint Kitts and Nevis",
        },
      },
    },
  },
  {
    name: {
      common: "Romania",
      official: "Romania",
      nativeName: { ron: { official: "România", common: "România" } },
    },
  },
  {
    name: {
      common: "Cambodia",
      official: "Kingdom of Cambodia",
      nativeName: {
        khm: { official: "ព្រះរាជាណាចក្រកម្ពុជា", common: "Kâmpŭchéa" },
      },
    },
  },
  {
    name: {
      common: "Zimbabwe",
      official: "Republic of Zimbabwe",
      nativeName: {
        bwg: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        eng: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        kck: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        khi: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        ndc: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        nde: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        nya: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        sna: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        sot: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        toi: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        tsn: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        tso: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        ven: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        xho: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
        zib: { official: "Republic of Zimbabwe", common: "Zimbabwe" },
      },
    },
  },
  {
    name: {
      common: "Jersey",
      official: "Bailiwick of Jersey",
      nativeName: {
        eng: { official: "Bailiwick of Jersey", common: "Jersey" },
        fra: { official: "Bailliage de Jersey", common: "Jersey" },
        nrf: { official: "Bailliage dé Jèrri", common: "Jèrri" },
      },
    },
  },
  {
    name: {
      common: "Kyrgyzstan",
      official: "Kyrgyz Republic",
      nativeName: {
        kir: { official: "Кыргыз Республикасы", common: "Кыргызстан" },
        rus: { official: "Кыргызская Республика", common: "Киргизия" },
      },
    },
  },
  {
    name: {
      common: "Caribbean Netherlands",
      official: "Bonaire, Sint Eustatius and Saba",
      nativeName: {
        nld: {
          official: "Bonaire, Sint Eustatius en Saba",
          common: "Caribisch Nederland",
        },
        pap: {
          official: "Boneiru, Sint Eustatius y Saba",
          common: "Boneiru, Sint Eustatius y Saba",
        },
      },
    },
  },
  {
    name: {
      common: "Guyana",
      official: "Co-operative Republic of Guyana",
      nativeName: {
        eng: { official: "Co-operative Republic of Guyana", common: "Guyana" },
      },
    },
  },
  {
    name: {
      common: "United States Minor Outlying Islands",
      official: "United States Minor Outlying Islands",
      nativeName: {
        eng: {
          official: "United States Minor Outlying Islands",
          common: "United States Minor Outlying Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Armenia",
      official: "Republic of Armenia",
      nativeName: {
        hye: { official: "Հայաստանի Հանրապետություն", common: "Հայաստան" },
      },
    },
  },
  {
    name: {
      common: "Lebanon",
      official: "Lebanese Republic",
      nativeName: {
        ara: { official: "الجمهورية اللبنانية", common: "لبنان" },
        fra: { official: "République libanaise", common: "Liban" },
      },
    },
  },
  {
    name: {
      common: "Montenegro",
      official: "Montenegro",
      nativeName: { cnr: { official: "Црна Гора", common: "Црна Гора" } },
    },
  },
  {
    name: {
      common: "Greenland",
      official: "Greenland",
      nativeName: {
        kal: { official: "Kalaallit Nunaat", common: "Kalaallit Nunaat" },
      },
    },
  },
  {
    name: {
      common: "Papua New Guinea",
      official: "Independent State of Papua New Guinea",
      nativeName: {
        eng: {
          official: "Independent State of Papua New Guinea",
          common: "Papua New Guinea",
        },
        hmo: {
          official: "Independen Stet bilong Papua Niugini",
          common: "Papua Niu Gini",
        },
        tpi: {
          official: "Independen Stet bilong Papua Niugini",
          common: "Papua Niugini",
        },
      },
    },
  },
  {
    name: {
      common: "Zambia",
      official: "Republic of Zambia",
      nativeName: { eng: { official: "Republic of Zambia", common: "Zambia" } },
    },
  },
  {
    name: {
      common: "Trinidad and Tobago",
      official: "Republic of Trinidad and Tobago",
      nativeName: {
        eng: {
          official: "Republic of Trinidad and Tobago",
          common: "Trinidad and Tobago",
        },
      },
    },
  },
  {
    name: {
      common: "French Southern and Antarctic Lands",
      official: "Territory of the French Southern and Antarctic Lands",
      nativeName: {
        fra: {
          official:
            "Territoire des Terres australes et antarctiques françaises",
          common: "Terres australes et antarctiques françaises",
        },
      },
    },
  },
  {
    name: {
      common: "Peru",
      official: "Republic of Peru",
      nativeName: {
        aym: { official: "Piruw Suyu", common: "Piruw" },
        que: { official: "Piruw Ripuwlika", common: "Piruw" },
        spa: { official: "República del Perú", common: "Perú" },
      },
    },
  },
  {
    name: {
      common: "Sweden",
      official: "Kingdom of Sweden",
      nativeName: {
        swe: { official: "Konungariket Sverige", common: "Sverige" },
      },
    },
  },
  {
    name: {
      common: "Sudan",
      official: "Republic of the Sudan",
      nativeName: {
        ara: { official: "جمهورية السودان", common: "السودان" },
        eng: { official: "Republic of the Sudan", common: "Sudan" },
      },
    },
  },
  {
    name: {
      common: "Saint Pierre and Miquelon",
      official: "Saint Pierre and Miquelon",
      nativeName: {
        fra: {
          official: "Collectivité territoriale de Saint-Pierre-et-Miquelon",
          common: "Saint-Pierre-et-Miquelon",
        },
      },
    },
  },
  {
    name: {
      common: "Oman",
      official: "Sultanate of Oman",
      nativeName: { ara: { official: "سلطنة عمان", common: "عمان" } },
    },
  },
  {
    name: {
      common: "India",
      official: "Republic of India",
      nativeName: {
        eng: { official: "Republic of India", common: "India" },
        hin: { official: "भारत गणराज्य", common: "भारत" },
        tam: { official: "இந்தியக் குடியரசு", common: "இந்தியா" },
      },
    },
  },
  {
    name: {
      common: "Taiwan",
      official: "Republic of China (Taiwan)",
      nativeName: { zho: { official: "中華民國", common: "台灣" } },
    },
  },
  {
    name: {
      common: "Mongolia",
      official: "Mongolia",
      nativeName: { mon: { official: "Монгол улс", common: "Монгол улс" } },
    },
  },
  {
    name: {
      common: "Senegal",
      official: "Republic of Senegal",
      nativeName: {
        fra: { official: "République du Sénégal", common: "Sénégal" },
      },
    },
  },
  {
    name: {
      common: "Tanzania",
      official: "United Republic of Tanzania",
      nativeName: {
        eng: { official: "United Republic of Tanzania", common: "Tanzania" },
        swa: {
          official: "Jamhuri ya Muungano wa Tanzania",
          common: "Tanzania",
        },
      },
    },
  },
  {
    name: {
      common: "Canada",
      official: "Canada",
      nativeName: {
        eng: { official: "Canada", common: "Canada" },
        fra: { official: "Canada", common: "Canada" },
      },
    },
  },
  {
    name: {
      common: "Costa Rica",
      official: "Republic of Costa Rica",
      nativeName: {
        spa: { official: "República de Costa Rica", common: "Costa Rica" },
      },
    },
  },
  {
    name: {
      common: "China",
      official: "People's Republic of China",
      nativeName: { zho: { official: "中华人民共和国", common: "中国" } },
    },
  },
  {
    name: {
      common: "Colombia",
      official: "Republic of Colombia",
      nativeName: {
        spa: { official: "República de Colombia", common: "Colombia" },
      },
    },
  },
  {
    name: {
      common: "Myanmar",
      official: "Republic of the Union of Myanmar",
      nativeName: {
        mya: {
          official: "ပြည်ထောင်စု သမ္မတ မြန်မာနိုင်ငံတော်",
          common: "မြန်မာ",
        },
      },
    },
  },
  {
    name: {
      common: "Russia",
      official: "Russian Federation",
      nativeName: {
        rus: { official: "Российская Федерация", common: "Россия" },
      },
    },
  },
  {
    name: {
      common: "North Korea",
      official: "Democratic People's Republic of Korea",
      nativeName: {
        kor: { official: "조선민주주의인민공화국", common: "조선" },
      },
    },
  },
  {
    name: {
      common: "Cayman Islands",
      official: "Cayman Islands",
      nativeName: {
        eng: { official: "Cayman Islands", common: "Cayman Islands" },
      },
    },
  },
  {
    name: {
      common: "Bouvet Island",
      official: "Bouvet Island",
      nativeName: { nor: { official: "Bouvetøya", common: "Bouvetøya" } },
    },
  },
  {
    name: {
      common: "Belarus",
      official: "Republic of Belarus",
      nativeName: {
        bel: { official: "Рэспубліка Беларусь", common: "Белару́сь" },
        rus: { official: "Республика Беларусь", common: "Беларусь" },
      },
    },
  },
  {
    name: {
      common: "Portugal",
      official: "Portuguese Republic",
      nativeName: {
        por: { official: "República português", common: "Portugal" },
      },
    },
  },
  {
    name: {
      common: "Eswatini",
      official: "Kingdom of Eswatini",
      nativeName: {
        eng: { official: "Kingdom of Eswatini", common: "Eswatini" },
        ssw: { official: "Umbuso weSwatini", common: "eSwatini" },
      },
    },
  },
  {
    name: {
      common: "Poland",
      official: "Republic of Poland",
      nativeName: {
        pol: { official: "Rzeczpospolita Polska", common: "Polska" },
      },
    },
  },
  {
    name: {
      common: "Switzerland",
      official: "Swiss Confederation",
      nativeName: {
        fra: { official: "Confédération suisse", common: "Suisse" },
        gsw: {
          official: "Schweizerische Eidgenossenschaft",
          common: "Schweiz",
        },
        ita: { official: "Confederazione Svizzera", common: "Svizzera" },
        roh: { official: "Confederaziun svizra", common: "Svizra" },
      },
    },
  },
  {
    name: {
      common: "Republic of the Congo",
      official: "Republic of the Congo",
      nativeName: {
        fra: { official: "République du Congo", common: "République du Congo" },
        kon: { official: "Repubilika ya Kongo", common: "Repubilika ya Kongo" },
        lin: { official: "Republíki ya Kongó", common: "Republíki ya Kongó" },
      },
    },
  },
  {
    name: {
      common: "Venezuela",
      official: "Bolivarian Republic of Venezuela",
      nativeName: {
        spa: {
          official: "República Bolivariana de Venezuela",
          common: "Venezuela",
        },
      },
    },
  },
  {
    name: {
      common: "Panama",
      official: "Republic of Panama",
      nativeName: {
        spa: { official: "República de Panamá", common: "Panamá" },
      },
    },
  },
  {
    name: {
      common: "Netherlands",
      official: "Kingdom of the Netherlands",
      nativeName: {
        nld: { official: "Koninkrijk der Nederlanden", common: "Nederland" },
      },
    },
  },
  {
    name: {
      common: "Samoa",
      official: "Independent State of Samoa",
      nativeName: {
        eng: { official: "Independent State of Samoa", common: "Samoa" },
        smo: { official: "Malo Saʻoloto Tutoʻatasi o Sāmoa", common: "Sāmoa" },
      },
    },
  },
  {
    name: {
      common: "Denmark",
      official: "Kingdom of Denmark",
      nativeName: {
        dan: { official: "Kongeriget Danmark", common: "Danmark" },
      },
    },
  },
  {
    name: {
      common: "Luxembourg",
      official: "Grand Duchy of Luxembourg",
      nativeName: {
        deu: { official: "Großherzogtum Luxemburg", common: "Luxemburg" },
        fra: { official: "Grand-Duché de Luxembourg", common: "Luxembourg" },
        ltz: { official: "Groussherzogtum Lëtzebuerg", common: "Lëtzebuerg" },
      },
    },
  },
  {
    name: {
      common: "Faroe Islands",
      official: "Faroe Islands",
      nativeName: {
        dan: { official: "Færøerne", common: "Færøerne" },
        fao: { official: "Føroyar", common: "Føroyar" },
      },
    },
  },
  {
    name: {
      common: "Slovenia",
      official: "Republic of Slovenia",
      nativeName: {
        slv: { official: "Republika Slovenija", common: "Slovenija" },
      },
    },
  },
  {
    name: {
      common: "Togo",
      official: "Togolese Republic",
      nativeName: { fra: { official: "République togolaise", common: "Togo" } },
    },
  },
  {
    name: {
      common: "Thailand",
      official: "Kingdom of Thailand",
      nativeName: { tha: { official: "ราชอาณาจักรไทย", common: "ประเทศไทย" } },
    },
  },
  {
    name: {
      common: "Wallis and Futuna",
      official: "Territory of the Wallis and Futuna Islands",
      nativeName: {
        fra: {
          official: "Territoire des îles Wallis et Futuna",
          common: "Wallis et Futuna",
        },
      },
    },
  },
  {
    name: {
      common: "Bahamas",
      official: "Commonwealth of the Bahamas",
      nativeName: {
        eng: { official: "Commonwealth of the Bahamas", common: "Bahamas" },
      },
    },
  },
  {
    name: {
      common: "Tonga",
      official: "Kingdom of Tonga",
      nativeName: {
        eng: { official: "Kingdom of Tonga", common: "Tonga" },
        ton: { official: "Kingdom of Tonga", common: "Tonga" },
      },
    },
  },
  {
    name: {
      common: "Greece",
      official: "Hellenic Republic",
      nativeName: {
        ell: { official: "Ελληνική Δημοκρατία", common: "Ελλάδα" },
      },
    },
  },
  {
    name: {
      common: "San Marino",
      official: "Republic of San Marino",
      nativeName: {
        ita: { official: "Repubblica di San Marino", common: "San Marino" },
      },
    },
  },
  {
    name: {
      common: "Réunion",
      official: "Réunion Island",
      nativeName: {
        fra: { official: "Ile de la Réunion", common: "La Réunion" },
      },
    },
  },
  {
    name: {
      common: "Vatican City",
      official: "Vatican City State",
      nativeName: {
        ita: { official: "Stato della Città del Vaticano", common: "Vaticano" },
        lat: { official: "Status Civitatis Vaticanæ", common: "Vaticanæ" },
      },
    },
  },
  {
    name: {
      common: "Burundi",
      official: "Republic of Burundi",
      nativeName: {
        fra: { official: "République du Burundi", common: "Burundi" },
        run: { official: "Republika y'Uburundi ", common: "Uburundi" },
      },
    },
  },
  {
    name: {
      common: "Bahrain",
      official: "Kingdom of Bahrain",
      nativeName: { ara: { official: "مملكة البحرين", common: "‏البحرين" } },
    },
  },
  {
    name: {
      common: "Marshall Islands",
      official: "Republic of the Marshall Islands",
      nativeName: {
        eng: {
          official: "Republic of the Marshall Islands",
          common: "Marshall Islands",
        },
        mah: { official: "Republic of the Marshall Islands", common: "M̧ajeļ" },
      },
    },
  },
  {
    name: {
      common: "Turks and Caicos Islands",
      official: "Turks and Caicos Islands",
      nativeName: {
        eng: {
          official: "Turks and Caicos Islands",
          common: "Turks and Caicos Islands",
        },
      },
    },
  },
  {
    name: {
      common: "Isle of Man",
      official: "Isle of Man",
      nativeName: {
        eng: { official: "Isle of Man", common: "Isle of Man" },
        glv: { official: "Ellan Vannin or Mannin", common: "Mannin" },
      },
    },
  },
  {
    name: {
      common: "Haiti",
      official: "Republic of Haiti",
      nativeName: {
        fra: { official: "République d'Haïti", common: "Haïti" },
        hat: { official: "Repiblik Ayiti", common: "Ayiti" },
      },
    },
  },
  {
    name: {
      common: "Afghanistan",
      official: "Islamic Republic of Afghanistan",
      nativeName: {
        prs: { official: "جمهوری اسلامی افغانستان", common: "افغانستان" },
        pus: { official: "د افغانستان اسلامي جمهوریت", common: "افغانستان" },
        tuk: {
          official: "Owganystan Yslam Respublikasy",
          common: "Owganystan",
        },
      },
    },
  },
  {
    name: {
      common: "Israel",
      official: "State of Israel",
      nativeName: {
        ara: { official: "دولة إسرائيل", common: "إسرائيل" },
        heb: { official: "מדינת ישראל", common: "ישראל" },
      },
    },
  },
  {
    name: {
      common: "Libya",
      official: "State of Libya",
      nativeName: { ara: { official: "الدولة ليبيا", common: "‏ليبيا" } },
    },
  },
  {
    name: {
      common: "Uruguay",
      official: "Oriental Republic of Uruguay",
      nativeName: {
        spa: { official: "República Oriental del Uruguay", common: "Uruguay" },
      },
    },
  },
  {
    name: {
      common: "Norfolk Island",
      official: "Territory of Norfolk Island",
      nativeName: {
        eng: {
          official: "Territory of Norfolk Island",
          common: "Norfolk Island",
        },
        pih: { official: "Teratri of Norf'k Ailen", common: "Norf'k Ailen" },
      },
    },
  },
  {
    name: {
      common: "Nicaragua",
      official: "Republic of Nicaragua",
      nativeName: {
        spa: { official: "República de Nicaragua", common: "Nicaragua" },
      },
    },
  },
  {
    name: {
      common: "Cook Islands",
      official: "Cook Islands",
      nativeName: {
        eng: { official: "Cook Islands", common: "Cook Islands" },
        rar: { official: "Kūki 'Āirani", common: "Kūki 'Āirani" },
      },
    },
  },
  {
    name: {
      common: "Laos",
      official: "Lao People's Democratic Republic",
      nativeName: {
        lao: { official: "ສາທາລະນະ ຊາທິປະໄຕ ຄົນລາວ ຂອງ", common: "ສປປລາວ" },
      },
    },
  },
  {
    name: {
      common: "Christmas Island",
      official: "Territory of Christmas Island",
      nativeName: {
        eng: {
          official: "Territory of Christmas Island",
          common: "Christmas Island",
        },
      },
    },
  },
  {
    name: {
      common: "Saint Helena, Ascension and Tristan da Cunha",
      official: "Saint Helena, Ascension and Tristan da Cunha",
      nativeName: {
        eng: {
          official: "Saint Helena, Ascension and Tristan da Cunha",
          common: "Saint Helena, Ascension and Tristan da Cunha",
        },
      },
    },
  },
  {
    name: {
      common: "Anguilla",
      official: "Anguilla",
      nativeName: { eng: { official: "Anguilla", common: "Anguilla" } },
    },
  },
  {
    name: {
      common: "Micronesia",
      official: "Federated States of Micronesia",
      nativeName: {
        eng: {
          official: "Federated States of Micronesia",
          common: "Micronesia",
        },
      },
    },
  },
  {
    name: {
      common: "Germany",
      official: "Federal Republic of Germany",
      nativeName: {
        deu: { official: "Bundesrepublik Deutschland", common: "Deutschland" },
      },
    },
  },
  {
    name: {
      common: "Guam",
      official: "Guam",
      nativeName: {
        cha: { official: "Guåhån", common: "Guåhån" },
        eng: { official: "Guam", common: "Guam" },
        spa: { official: "Guam", common: "Guam" },
      },
    },
  },
  {
    name: {
      common: "Kiribati",
      official: "Independent and Sovereign Republic of Kiribati",
      nativeName: {
        eng: {
          official: "Independent and Sovereign Republic of Kiribati",
          common: "Kiribati",
        },
        gil: { official: "Ribaberiki Kiribati", common: "Kiribati" },
      },
    },
  },
  {
    name: {
      common: "Sint Maarten",
      official: "Sint Maarten",
      nativeName: {
        eng: { official: "Sint Maarten", common: "Sint Maarten" },
        fra: { official: "Saint-Martin", common: "Saint-Martin" },
        nld: { official: "Sint Maarten", common: "Sint Maarten" },
      },
    },
  },
  {
    name: {
      common: "Spain",
      official: "Kingdom of Spain",
      nativeName: { spa: { official: "Reino de España", common: "España" } },
    },
  },
  {
    name: {
      common: "Jamaica",
      official: "Jamaica",
      nativeName: {
        eng: { official: "Jamaica", common: "Jamaica" },
        jam: { official: "Jamaica", common: "Jamaica" },
      },
    },
  },
  {
    name: {
      common: "Palestine",
      official: "State of Palestine",
      nativeName: { ara: { official: "دولة فلسطين", common: "فلسطين" } },
    },
  },
  {
    name: {
      common: "French Guiana",
      official: "Guiana",
      nativeName: { fra: { official: "Guyane", common: "Guyane française" } },
    },
  },
  {
    name: {
      common: "Andorra",
      official: "Principality of Andorra",
      nativeName: {
        cat: { official: "Principat d'Andorra", common: "Andorra" },
      },
    },
  },
  {
    name: {
      common: "Chile",
      official: "Republic of Chile",
      nativeName: { spa: { official: "República de Chile", common: "Chile" } },
    },
  },
  {
    name: {
      common: "Lesotho",
      official: "Kingdom of Lesotho",
      nativeName: {
        eng: { official: "Kingdom of Lesotho", common: "Lesotho" },
        sot: { official: "Kingdom of Lesotho", common: "Lesotho" },
      },
    },
  },
  {
    name: {
      common: "Australia",
      official: "Commonwealth of Australia",
      nativeName: {
        eng: { official: "Commonwealth of Australia", common: "Australia" },
      },
    },
  },
  {
    name: {
      common: "Grenada",
      official: "Grenada",
      nativeName: { eng: { official: "Grenada", common: "Grenada" } },
    },
  },
  {
    name: {
      common: "Ghana",
      official: "Republic of Ghana",
      nativeName: { eng: { official: "Republic of Ghana", common: "Ghana" } },
    },
  },
  {
    name: {
      common: "Seychelles",
      official: "Republic of Seychelles",
      nativeName: {
        crs: { official: "Repiblik Sesel", common: "Sesel" },
        eng: { official: "Republic of Seychelles", common: "Seychelles" },
        fra: { official: "République des Seychelles", common: "Seychelles" },
      },
    },
  },
  {
    name: {
      common: "Angola",
      official: "Republic of Angola",
      nativeName: {
        por: { official: "República de Angola", common: "Angola" },
      },
    },
  },
  {
    name: {
      common: "Bermuda",
      official: "Bermuda",
      nativeName: { eng: { official: "Bermuda", common: "Bermuda" } },
    },
  },
  {
    name: {
      common: "Pakistan",
      official: "Islamic Republic of Pakistan",
      nativeName: {
        eng: { official: "Islamic Republic of Pakistan", common: "Pakistan" },
        urd: { official: "اسلامی جمہوریۂ پاكستان", common: "پاكستان" },
      },
    },
  },
  {
    name: {
      common: "Mali",
      official: "Republic of Mali",
      nativeName: { fra: { official: "République du Mali", common: "Mali" } },
    },
  },
  {
    name: {
      common: "Saudi Arabia",
      official: "Kingdom of Saudi Arabia",
      nativeName: {
        ara: {
          official: "المملكة العربية السعودية",
          common: "العربية السعودية",
        },
      },
    },
  },
  {
    name: {
      common: "Curaçao",
      official: "Country of Curaçao",
      nativeName: {
        eng: { official: "Country of Curaçao", common: "Curaçao" },
        nld: { official: "Land Curaçao", common: "Curaçao" },
        pap: { official: "Pais Kòrsou", common: "Pais Kòrsou" },
      },
    },
  },
  {
    name: {
      common: "South Korea",
      official: "Republic of Korea",
      nativeName: { kor: { official: "대한민국", common: "한국" } },
    },
  },
  {
    name: {
      common: "Ethiopia",
      official: "Federal Democratic Republic of Ethiopia",
      nativeName: {
        amh: { official: "የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ", common: "ኢትዮጵያ" },
      },
    },
  },
  {
    name: {
      common: "Guadeloupe",
      official: "Guadeloupe",
      nativeName: { fra: { official: "Guadeloupe", common: "Guadeloupe" } },
    },
  },
  {
    name: {
      common: "Bangladesh",
      official: "People's Republic of Bangladesh",
      nativeName: {
        ben: { official: "বাংলাদেশ গণপ্রজাতন্ত্রী", common: "বাংলাদেশ" },
      },
    },
  },
  {
    name: {
      common: "New Zealand",
      official: "New Zealand",
      nativeName: {
        eng: { official: "New Zealand", common: "New Zealand" },
        mri: { official: "Aotearoa", common: "Aotearoa" },
        nzs: { official: "New Zealand", common: "New Zealand" },
      },
    },
  },
  {
    name: {
      common: "Comoros",
      official: "Union of the Comoros",
      nativeName: {
        ara: { official: "الاتحاد القمري", common: "القمر‎" },
        fra: { official: "Union des Comores", common: "Comores" },
        zdj: { official: "Udzima wa Komori", common: "Komori" },
      },
    },
  },
  {
    name: {
      common: "Belize",
      official: "Belize",
      nativeName: {
        bjz: { official: "Belize", common: "Belize" },
        eng: { official: "Belize", common: "Belize" },
        spa: { official: "Belice", common: "Belice" },
      },
    },
  },
  {
    name: {
      common: "Uganda",
      official: "Republic of Uganda",
      nativeName: {
        eng: { official: "Republic of Uganda", common: "Uganda" },
        swa: { official: "Republic of Uganda", common: "Uganda" },
      },
    },
  },
  {
    name: {
      common: "Singapore",
      official: "Republic of Singapore",
      nativeName: {
        eng: { official: "Republic of Singapore", common: "Singapore" },
        zho: { official: "新加坡共和国", common: "新加坡" },
        msa: { official: "Republik Singapura", common: "Singapura" },
        tam: { official: "சிங்கப்பூர் குடியரசு", common: "சிங்கப்பூர்" },
      },
    },
  },
  {
    name: {
      common: "Liechtenstein",
      official: "Principality of Liechtenstein",
      nativeName: {
        deu: { official: "Fürstentum Liechtenstein", common: "Liechtenstein" },
      },
    },
  },
  {
    name: {
      common: "Hungary",
      official: "Hungary",
      nativeName: { hun: { official: "Magyarország", common: "Magyarország" } },
    },
  },
  {
    name: {
      common: "Iceland",
      official: "Iceland",
      nativeName: { isl: { official: "Ísland", common: "Ísland" } },
    },
  },
  {
    name: {
      common: "Tajikistan",
      official: "Republic of Tajikistan",
      nativeName: {
        rus: { official: "Республика Таджикистан", common: "Таджикистан" },
        tgk: { official: "Ҷумҳурии Тоҷикистон", common: "Тоҷикистон" },
      },
    },
  },
  {
    name: {
      common: "Namibia",
      official: "Republic of Namibia",
      nativeName: {
        afr: { official: "Republiek van Namibië", common: "Namibië" },
        deu: { official: "Republik Namibia", common: "Namibia" },
        eng: { official: "Republic of Namibia", common: "Namibia" },
        her: { official: "Republic of Namibia", common: "Namibia" },
        hgm: { official: "Republic of Namibia", common: "Namibia" },
        kwn: { official: "Republic of Namibia", common: "Namibia" },
        loz: { official: "Republic of Namibia", common: "Namibia" },
        ndo: { official: "Republic of Namibia", common: "Namibia" },
        tsn: { official: "Lefatshe la Namibia", common: "Namibia" },
      },
    },
  },
  {
    name: {
      common: "Timor-Leste",
      official: "Democratic Republic of Timor-Leste",
      nativeName: {
        por: {
          official: "República Democrática de Timor-Leste",
          common: "Timor-Leste",
        },
        tet: {
          official: "Repúblika Demokrátika Timór-Leste",
          common: "Timór-Leste",
        },
      },
    },
  },
  {
    name: {
      common: "Egypt",
      official: "Arab Republic of Egypt",
      nativeName: { ara: { official: "جمهورية مصر العربية", common: "مصر" } },
    },
  },
  {
    name: {
      common: "Serbia",
      official: "Republic of Serbia",
      nativeName: { srp: { official: "Република Србија", common: "Србија" } },
    },
  },
  {
    name: {
      common: "Mauritius",
      official: "Republic of Mauritius",
      nativeName: {
        eng: { official: "Republic of Mauritius", common: "Mauritius" },
        fra: { official: "République de Maurice", common: "Maurice" },
        mfe: { official: "Republik Moris", common: "Moris" },
      },
    },
  },
  {
    name: {
      common: "Macau",
      official:
        "Macao Special Administrative Region of the People's Republic of China",
      nativeName: {
        por: {
          official:
            "Região Administrativa Especial de Macau da República Popular da China",
          common: "Macau",
        },
        zho: { official: "中华人民共和国澳门特别行政区", common: "澳门" },
      },
    },
  },
  {
    name: {
      common: "French Polynesia",
      official: "French Polynesia",
      nativeName: {
        fra: { official: "Polynésie française", common: "Polynésie française" },
      },
    },
  },
  {
    name: {
      common: "Maldives",
      official: "Republic of the Maldives",
      nativeName: {
        div: {
          official: "ދިވެހިރާއްޖޭގެ ޖުމްހޫރިއްޔާ",
          common: "ދިވެހިރާއްޖޭގެ",
        },
      },
    },
  },
  {
    name: {
      common: "Indonesia",
      official: "Republic of Indonesia",
      nativeName: {
        ind: { official: "Republik Indonesia", common: "Indonesia" },
      },
    },
  },
  {
    name: {
      common: "DR Congo",
      official: "Democratic Republic of the Congo",
      nativeName: {
        fra: {
          official: "République démocratique du Congo",
          common: "RD Congo",
        },
        kon: {
          official: "Repubilika ya Kongo Demokratiki",
          common: "Repubilika ya Kongo Demokratiki",
        },
        lin: {
          official: "Republiki ya Kongó Demokratiki",
          common: "Republiki ya Kongó Demokratiki",
        },
        lua: {
          official: "Ditunga dia Kongu wa Mungalaata",
          common: "Ditunga dia Kongu wa Mungalaata",
        },
        swa: {
          official: "Jamhuri ya Kidemokrasia ya Kongo",
          common: "Jamhuri ya Kidemokrasia ya Kongo",
        },
      },
    },
  },
  {
    name: {
      common: "Estonia",
      official: "Republic of Estonia",
      nativeName: { est: { official: "Eesti Vabariik", common: "Eesti" } },
    },
  },
  {
    name: {
      common: "Vietnam",
      official: "Socialist Republic of Vietnam",
      nativeName: {
        vie: {
          official: "Cộng hòa xã hội chủ nghĩa Việt Nam",
          common: "Việt Nam",
        },
      },
    },
  },
  {
    name: {
      common: "Italy",
      official: "Italian Republic",
      nativeName: {
        ita: { official: "Repubblica italiana", common: "Italia" },
      },
    },
  },
  {
    name: {
      common: "Guinea",
      official: "Republic of Guinea",
      nativeName: {
        fra: { official: "République de Guinée", common: "Guinée" },
      },
    },
  },
  {
    name: {
      common: "Chad",
      official: "Republic of Chad",
      nativeName: {
        ara: { official: "جمهورية تشاد", common: "تشاد‎" },
        fra: { official: "République du Tchad", common: "Tchad" },
      },
    },
  },
  {
    name: {
      common: "Ecuador",
      official: "Republic of Ecuador",
      nativeName: {
        spa: { official: "República del Ecuador", common: "Ecuador" },
      },
    },
  },
  {
    name: {
      common: "Georgia",
      official: "Georgia",
      nativeName: { kat: { official: "საქართველო", common: "საქართველო" } },
    },
  },
  {
    name: {
      common: "Malawi",
      official: "Republic of Malawi",
      nativeName: {
        eng: { official: "Republic of Malawi", common: "Malawi" },
        nya: {
          official: "Chalo cha Malawi, Dziko la Malaŵi",
          common: "Malaŵi",
        },
      },
    },
  },
  {
    name: {
      common: "Iraq",
      official: "Republic of Iraq",
      nativeName: {
        ara: { official: "جمهورية العراق", common: "العراق" },
        arc: { official: "ܩܘܼܛܢܵܐ ܐܝܼܪܲܩ", common: "ܩܘܼܛܢܵܐ" },
        ckb: { official: "کۆماری عێراق", common: "کۆماری" },
      },
    },
  },
  {
    name: {
      common: "Svalbard and Jan Mayen",
      official: "Svalbard og Jan Mayen",
      nativeName: {
        nor: {
          official: "Svalbard og Jan Mayen",
          common: "Svalbard og Jan Mayen",
        },
      },
    },
  },
  {
    name: {
      common: "Benin",
      official: "Republic of Benin",
      nativeName: { fra: { official: "République du Bénin", common: "Bénin" } },
    },
  },
  {
    name: {
      common: "Japan",
      official: "Japan",
      nativeName: { jpn: { official: "日本", common: "日本" } },
    },
  },
  {
    name: {
      common: "Dominican Republic",
      official: "Dominican Republic",
      nativeName: {
        spa: {
          official: "República Dominicana",
          common: "República Dominicana",
        },
      },
    },
  },
  {
    name: {
      common: "Qatar",
      official: "State of Qatar",
      nativeName: { ara: { official: "دولة قطر", common: "قطر" } },
    },
  },
  {
    name: {
      common: "Gabon",
      official: "Gabonese Republic",
      nativeName: {
        fra: { official: "République gabonaise", common: "Gabon" },
      },
    },
  },
];
//populate select with id #country with all countries
let sort_countries = countries.sort((a, b) => {
  if (a.name.common < b.name.common) {
    return -1;
  }
  if (a.name.common > b.name.common) {
    return 1;
  }
  return 0;
});

sort_countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country.name.common;
  option.innerText = country.name.common;
  document.querySelector("#country").appendChild(option);
});

// get geolocation info and append to the form the loc and autoselect the country
fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(
      "#country option[value='" + data.country_name + "']"
    ).selected = "selected";
    document.querySelector("#lat").value = data.latitude;
    document.querySelector("#long").value = data.longitude;
    document.querySelector("#zip").value = data.postal;
  });

// get request to zapier storage
//https://hooks.zapier.com/hooks/catch/17703959/3qi5akn/
fetch(
  "https://store.zapier.com/api/records?secret=72745ce5-710e-450f-be72-3b0523cb0106",
  {
    method: "GET",
  }
)
  .then((response) => response.json())
  .then((data) => {
    contries = data.countries;
    utc_data = data;

    contries.list.forEach((country) => {
      if (countryCounts[country]) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });

    sortedCountries = Object.keys(countryCounts).sort(function (a, b) {
      return countryCounts[b] - countryCounts[a];
    });

    countries_top_labels = [];
    for (let i = 0; i < 3; i++) {
      countries_top_labels.push(
        sortedCountries[i] + " " + countryCounts[sortedCountries[i]]
      );
    }
    countrieChart.data.labels = countries_top_labels;
    countrieChart.data.datasets[0].data = Object.values(countryCounts)
      .sort((a, b) => b - a)
      .slice(0, 3);
    countrieChart.update();

    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    let timeZone_label = timeZone.replaceAll("_", " ");
    document.querySelector("#timezone1").innerText = timeZone_label;
    document.querySelector("#timezone2").innerText = timeZone_label;
    document.querySelector("#timezone3").innerText = timeZone_label;
    document.querySelector("#timezone-4").value = timeZone;
    document.querySelector("#successTimezone").innerText = timeZone_label;
    // document.querySelector("#your-timezone").innerText = timeZone;

    const offset = getTimezoneOffset(timeZone);
    document.querySelector("#timezone-3").value = offset * -1;

    document.querySelector("#total_minutes").innerText = contries.list.length;
    document.querySelector("#total_hours").innerText = data.active_users;

    // debugger;
    for (let hour = 0; hour < 24; hour++) {
      let hour_ = hour + offset;
      if (hour_ < 0) {
        hour_ = 24 + hour_;
      }
      if (hour_ > 23) {
        hour_ = hour_ - 24;
      }

      for (let minute = 0; minute < 60; minute++) {
        const time = `${hour_.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;
        const time_original = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;
        if (data[time_original]) {
          hours_data[time] = parseInt(data[time_original]);
        } else {
          hours_data[time] = 0;
        }
      }
    }

    // populateAllHours();
    const now = new Date();
    document
      .querySelector(".circle_link[data-hour='" + now.getHours() + "']")
      .click();
    // filterSingleHout(now.getHours());
  })
  .catch((error) => {
    console.error("Error:", error);
  });

document.querySelectorAll(".circle_link").forEach((el) => {
  el.addEventListener("click", () => {
    // get zapier webhook and populate chart js info
    const hour = el.getAttribute("data-hour");
    filterSingleHout(hour);
  });
});

document.querySelectorAll(".w-dropdown-list a").forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log("click new timezone", e.target.innerText);
    const offset = el.getAttribute("data-offset");

    hours_data = [];
    for (let hour = 0; hour < 24; hour++) {
      let hour_ = hour + offset;
      if (hour_ < 0) {
        hour_ = 24 + hour_;
      }
      if (hour_ > 23) {
        hour_ = hour_ - 24;
      }

      for (let minute = 0; minute < 60; minute++) {
        const time = `${hour_.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;
        const time_original = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;
        if (utc_data[time_original]) {
          hours_data[time] = parseInt(utc_data[time_original]);
        } else {
          hours_data[time] = 0;
        }
      }
    }

    // populateAllHours();
    const now = new Date();
    document
      .querySelector(".circle_link[data-hour='" + now.getHours() + "']")
      .click();
    // document.querySelector("#selectedTimezone").innerText = e.target.innerText;
  });
});

// scrollContainer.addEventListener("wheel", (evt) => {
//   evt.preventDefault();
//   scrollContainer.scrollLeft += evt.deltaY;
// });

document
  .querySelector("#timeSelector")
  .addEventListener("change", function (ev) {
    //format 24 hours string to 12 hours string
    let hour = parseInt(ev.target.value.slice(0, 2));
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    const timeString = `${hour
      .toString()
      .padStart(2, "0")}:${ev.target.value.slice(3, 5)} ${period}`;

    document.querySelector("#selectedTime").innerHTML = timeString;
    document.querySelector("#successTime").innerHTML = timeString;
  });

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// on load
document.addEventListener("DOMContentLoaded", function () {
  scrollContainer.addEventListener("mousedown", (evt) => {
    isDragging = true;
    startX = evt.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener("mousemove", (evt) => {
    if (!isDragging) return;
    evt.preventDefault();
    const x = evt.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 0.7; // Adjust the scroll speed as needed
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  scrollContainer.addEventListener("mouseup", () => {
    isDragging = false;
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

// ...

// scrollContainer.addEventListener("scroll", (evt) => {
//   evt.preventDefault();
//   // if (updating) return;
//   // debugger;
//   const scrollPosition = scrollContainer.scrollLeft;
//   const hourWidth = scrollContainer.scrollWidth / 3; // Assuming 10 hours are displayed

//   const currentHour =
//     Math.floor(scrollPosition / hourWidth) + (new Date().getHours() - 1); // Assuming the first hour is 7:00

//   // Update circle_item that matches the current hour
//   const circleItems = document.querySelectorAll(".circle_item");
//   circleItems.forEach((item) => {
//     const hour = parseInt(item.querySelector("a").getAttribute("data-hour"));
//     if (hour === currentHour) {
//       // Update the circle_item
//       // ...
//       makeItemActive($(item));
//     }
//   });
// });

var prevHour = document.querySelector("#prevHour");
var nextHour = document.querySelector("#nextHour");
prevHour.addEventListener("click", () => {
  const currentHour = parseInt(
    document.querySelector(".circle_item.current a").getAttribute("data-hour")
  );
  let newHour = currentHour - 1;
  if (newHour < 0) {
    newHour = 23;
  }
  document.querySelector(".circle_link[data-hour='" + newHour + "']").click();
});
nextHour.addEventListener("click", () => {
  const currentHour = parseInt(
    document.querySelector(".circle_item.current a").getAttribute("data-hour")
  );
  let newHour = currentHour + 1;
  if (newHour > 23) {
    newHour = 0;
  }
  document.querySelector(".circle_link[data-hour='" + newHour + "']").click();
});

// ...

// graph

const ctx = document.getElementById("myChart");
var myChartObj = new Chart(ctx, {
  type: "bar",
  backgroundColor: "rgba(0,0,0, 1)",
  showAllTooltips: true,
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderWidth: 1,
        barThickness: 2,
        paddding: 0,
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  },
  options: {
    devicePixelRatio: 2,
    responsive: false,
    backgroundColor: "rgba(255,255,255, 1)",
    legend: {
      display: false,
      labels: {
        fontColor: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        padding: 20,
        boxWidth: 0,
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        //always display the tooltip
        enabled: true,
        mode: "point",

        backgroundColor: "#5DCEE8",
        padding: 10,
        titleColor: "#5DCEE8",
        displayColors: false,
        titleFont: {
          size: 1,
        },
        bodyColor: "#000000",
        bodyFont: {
          size: 23,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        display: false,
        suggestedMax: 10,
      },
      x: {
        beginAtZero: true,
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          color: "rgba(255, 255, 255, 1)",
          padding: 20,
          backdropPadding: 20,
          font: {
            size: (c) => {
              return c.index % 15 === 0 ? 20 : 10;
            },
            weight: (c) => {
              return c.index % 15 === 0 ? "bold" : "regular";
            },
          },
        },
      },
    },
  },
});

const ctx2 = document.getElementById("topChart");
var countrieChart = new Chart(ctx2, {
  type: "bar",
  data,
  data: {
    labels: [],
    datasets: [
      {
        axis: "y",
        label: "",
        data: [],
        fill: false,
        barThickness: 45,
        backgroundColor: ["#5DCEE8", "#5DCEE8", "#5DCEE8"],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  },
  pointRadius: 0,
  pointHitRadius: 0,
  options: {
    devicePixelRatio: 1,
    indexAxis: "y",
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        tooltipModel.opacity = 0;
      },
    },
    scales: {
      x: {
        display: false,
        stacked: true,
        ticks: {
          beginAtZero: true,
          fontColor: "white",
          color: "#000000",
        },
        scaleLabel: {
          fontColor: "white",
        },
      },
      y: {
        grid: {
          color: "black",
          borderColor: "#000",
          tickColor: "#000",
          offset: true,
          offsetLeft: 10,
        },
        borderColor: "black",
        stacked: true,
        display: true,
        ticks: {
          mirror: true,
          beginAtZero: true,
          fontColor: "white",
          color: "#000000",
          z: 20,
          font: {
            fontColor: "#000",
            size: 14,
            padding: "5px",
          },
        },
        scaleLabel: {
          fontColor: "black",
        },
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        custom: function (tooltipModel) {
          tooltipModel.opacity = 0;
        },
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
    },
  },
});

// world
var worldData = [];
fetch(
  "https://store.zapier.com/api/records?secret=13e5804f-c4a4-446d-84d8-17b5c3415054",
  {
    method: "GET",
  }
)
  .then((response) => response.json())
  .then((data) => {
    var temp = data.earthDate.list.map((item) => {
      try {
        worldData.push(JSON.parse(item));
      } catch (error) {}
    });
    initMap();
  });

function isMobile() {
  return window.innerWidth < 768;
}

var data;
("use strict");
var Earth = function (e, t) {
  let n,
    a,
    r,
    o,
    i,
    s,
    l = { x: 0, y: 0 },
    $ = { x: 0, y: 0 },
    d = [],
    c = { x: 1.9 * Math.PI, y: Math.PI / 6 },
    _ = { x: 1.9 * Math.PI, y: Math.PI / 6 },
    u = { x: 0, y: 0 },
    m = new THREE.Vector3(0, 0, 0),
    p = (new THREE.Clock(), Math.PI / 2),
    g = {
      atmosphere: {
        uniforms: {},
        vertexShader:
          "varying vec3 vNormal;\nvoid main() {\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "varying vec3 vNormal;\nvoid main() {\nfloat intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 3.0 );\ngl_FragColor = vec4( 0.3, 0.4, 0.6, 0.075 ) * intensity;\n}",
      },
    };
  function w(t) {
    t.preventDefault(),
      e.addEventListener("mouseup", h, !1),
      e.addEventListener("mousemove", y, !1),
      e.addEventListener("mouseout", v, !1),
      ($.x = -t.clientX),
      ($.y = t.clientY),
      (u.x = _.x),
      (u.y = _.y),
      (e.style.cursor = "move");
  }
  function y(e) {
    (l.x = -e.clientX),
      (l.y = e.clientY),
      (_.x = u.x + (l.x - $.x) * 0.005),
      (_.y = u.y + (l.y - $.y) * 0.005),
      (_.y = _.y > p ? p : _.y),
      (_.y = _.y < -p ? -p : _.y);
  }
  function h(t) {
    e.removeEventListener("mousemove", y, !1),
      e.removeEventListener("mouseup", h, !1),
      e.removeEventListener("mouseout", v, !1),
      (e.style.cursor = "auto");
  }
  function v(t) {
    e.removeEventListener("mouseup", h, !1),
      e.removeEventListener("mouseout", v, !1);
  }
  function f(e) {
    (n.aspect = window.innerWidth / window.innerHeight),
      n.updateProjectionMatrix(),
      r.setSize(window.innerWidth, window.innerHeight);
  }
  function x(t) {
    "move" != e.style.cursor && (_.x += 75e-5),
      (c.x += (_.x - c.x) * 0.1),
      (c.y += (_.y - c.y) * 0.1),
      (n.position.x = 350 * Math.sin(c.x) * Math.cos(c.y)),
      (n.position.y = 350 * Math.sin(c.y)),
      (n.position.z = 350 * Math.cos(c.x) * Math.cos(c.y)),
      n.lookAt(m),
      r.render(a, n),
      o.render(),
      TWEEN.update(t),
      requestAnimationFrame(x);
  }
  function P(e, t, n, r) {
    let o = (function e(t, n, a) {
        let r = (t * Math.PI) / 180,
          o = ((n - 180) * Math.PI) / 180;
        return new THREE.Vector3(
          -a * Math.cos(r) * Math.cos(o),
          a * Math.sin(r),
          a * Math.cos(r) * Math.sin(o)
        );
      })(e, t, 150),
      i = new THREE.SphereGeometry(n, 32, 32),
      s = new THREE.MeshBasicMaterial({
        color: "#bef0db",
        opacity: 0.4,
        side: THREE.DoubleSide,
        transparent: !0,
      }),
      l = new THREE.Mesh(i, s);
    l.position.set(o.x, o.y, o.z),
      l.scale.set(0.01, 0.01, 0.01),
      l.lookAt(m),
      a.add(l),
      new TWEEN.Tween(l.scale)
        .to({ x: 1, y: 1, z: 1 }, 1e3)
        .delay(350 * r + 1500)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    let $ = new THREE.RingGeometry(n + 0.5, n + 1.5, 32),
      d = new THREE.MeshBasicMaterial({
        color: "#ff3600",
        opacity: 0.2,
        side: THREE.DoubleSide,
        transparent: !0,
      }),
      c = new THREE.Mesh($, d);
    return (
      c.position.set(o.x, o.y, o.z),
      c.scale.set(0.01, 0.01, 0.01),
      c.lookAt(m),
      a.add(c),
      new TWEEN.Tween(c.scale)
        .to({ x: 1, y: 1, z: 1 }, 1500)
        .delay(350 * r + 1500)
        .easing(TWEEN.Easing.Cubic.Out)
        .start(),
      l
    );
  }
  function S(e, t, n) {
    let r = e.clone().sub(t).length(),
      o = e.clone().lerp(t, 0.5),
      i = o.length();
    o.normalize(), o.multiplyScalar(i + 0.25 * r);
    let s = new THREE.Vector3().subVectors(e, t);
    s.normalize();
    let l = o.clone().add(s.clone().multiplyScalar(0.25 * r)),
      $ = o.clone().add(s.clone().multiplyScalar(-0.25 * r)),
      d = new THREE.CubicBezierCurve3(e, e, l, o),
      c = new THREE.CubicBezierCurve3(o, $, t, t),
      _ = d.getPoints(100);
    (_ = (_ = _.splice(0, _.length - 1)).concat(c.getPoints(100))).push(m);
    let u = new THREE.BufferGeometry(),
      p = new Float32Array(3 * _.length);
    for (let g = 0; g < _.length; g++)
      (p[3 * g + 0] = _[g].x), (p[3 * g + 1] = _[g].y), (p[3 * g + 2] = _[g].z);
    u.addAttribute("position", new THREE.BufferAttribute(p, 3)),
      u.setDrawRange(0, 0);
    var w = new THREE.LineBasicMaterial({
      color: new THREE.Color(16777215),
      linewidth: 3,
      opacity: 0.25,
      transparent: !0,
    });
    let y = new THREE.Line(u, w);
    return (y.currentPoint = 0), a.add(y), y;
  }
  return (
    !(function l() {
      (i = window.innerWidth),
        (s = isMobile() ? 400 : window.innerHeight), // resize for mobile
        (n = new THREE.PerspectiveCamera(70, i / s, 1, 700)),
        (a = new THREE.Scene()).add(n);
      let $ = new THREE.Geometry();
      for (let c = 0; c < 1e3; c++) {
        let _ = -1 + 2 * Math.random(),
          u = -1 + 2 * Math.random(),
          m = -1 + 2 * Math.random(),
          p = 1 / Math.sqrt(Math.pow(_, 2) + Math.pow(u, 2) + Math.pow(m, 2));
        (_ *= p), (u *= p), (m *= p);
        let y = new THREE.Vector3(350 * _, 350 * u, 350 * m);
        $.vertices.push(y);
      }
      let h = new THREE.Points(
        $,
        new THREE.PointsMaterial({ color: "#555555", size: 3 })
      );
      a.add(h);
      let v = new THREE.PointLight("#ffffff", 0.5);
      n.add(v),
        v.position.set(175, 175, 0),
        (v.target = n),
        (THREE.ImageUtils.crossOrigin = "");
      var x = THREE.ImageUtils.loadTexture(
          "//s3-us-west-2.amazonaws.com/s.cdpn.io/68727/earth-lights.jpg"
        ),
        M = THREE.ImageUtils.loadTexture(
          "//s3-us-west-2.amazonaws.com/s.cdpn.io/68727/earth-bump.jpg"
        );
      (x.minFilter = THREE.LinearFilter), (M.minFilter = THREE.LinearFilter);
      var b = new THREE.SphereGeometry(150, 50, 30),
        E = new THREE.MeshPhongMaterial({
          bumpMap: M,
          bumpScale: 4,
          emissiveMap: x,
          emissive: "#333333",
          map: x,
          specular: "#010101",
        });
      let z = new THREE.Mesh(b, E);
      a.add(z);
      let L = new THREE.ShaderMaterial({
          vertexShader: g.atmosphere.vertexShader,
          fragmentShader: g.atmosphere.fragmentShader,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: !0,
        }),
        C = new THREE.Mesh(b, L);
      C.scale.set(1.3, 1.3, 1.3), a.add(C);
      for (let B = 0; B < t.length; B++) {
        d.push(new P(t[B].lat, t[B].long, t[B].r, B));
        let I = S(d[0].position, d[B].position);
        new TWEEN.Tween(I)
          .to({ currentPoint: 200 }, 2e3)
          .delay(350 * B + 1500)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(function () {
            I.geometry.setDrawRange(0, I.currentPoint);
          })
          .start();
      }
      ((r = new THREE.WebGLRenderer({
        alpha: !0,
        antialias: !0,
      })).autoClear = !1),
        r.setPixelRatio(window.devicePixelRatio),
        r.setSize(i, s),
        (o = new THREE.EffectComposer(r)).addPass(new THREE.RenderPass(a, n));
      let R = new THREE.BloomPass(1.75),
        G = new THREE.FilmPass(0.25, 0.5, 2048, 0),
        A = new THREE.ShaderPass(THREE.RGBShiftShader);
      (A.uniforms.amount.value = 0.003),
        (A.renderToScreen = !0),
        o.addPass(R),
        o.addPass(G),
        o.addPass(A),
        e.addEventListener("mousedown", w, !1),
        window.addEventListener("resize", f, !1),
        e.appendChild(r.domElement);
    })(),
    x(),
    (this.animate = x),
    this
  );
};

function initMap() {
  var container = document.getElementById("world"),
    planet = new Earth(container, worldData);
}
// Add a CSS class to start the animation

// CSS animation keyframes
const keyframes = `
#ticker-top, #ticker-bottom {
  -webkit-animation-iteration-count: infinite; 
           animation-iteration-count: infinite;
   -webkit-animation-timing-function: linear;
           animation-timing-function: linear;
  -webkit-animation-name: ticker;
          animation-name: ticker;
   -webkit-animation-duration: 30s;
           animation-duration: 30x;
 
 }
@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

`;

// Create a style element and append the keyframes
const style = document.createElement("style");
style.innerHTML = keyframes;
document.head.appendChild(style);

export interface Character {
  id: string;
  name: string;
  full: string;
  role: string;
  hint: string;
  image?: string;
  accent: string;
  accentSoft: string;
  lines: string[];
  signature: string;
  finaleNote: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "suho",
    name: "Suho",
    full: "Li Su Xo",
    role: "Saebom maktabining 1-o'quvchisi · Sovuq qaroq, iliq qalb",
    hint: "Siz uni eng ko'p yaxshi ko'rishingizni bilamiz... Shuning uchun u — birinchi.",
    image: "images/suho.jpg",
    accent: "#5a6ce0",
    accentSoft: "rgba(90,108,224,0.16)",
    lines: [
      "Salom, Mushtariy.",
      "Men ko'p gapiradigan odam emasman... Lekin bugun birinchi bo'lib aytishim kerak edi: tug'ilgan kuningiz bilan — chin qalbimdan.",
      "Sizga bir sir aytay: haqiqiy go'zallik na ko'zda, na makiyajda. U — qalbda. Va sizda undan ortiqcha bor.",
      "Orzularingiz sari borayotgan yo'lingizda hech narsadan qo'rqmang. Men sizga ishonaman.",
      "Xo'sh... bu gaplarimiz oramizda qolsin, yaxshimi? Qolganlariga aytib qo'ymang.",
    ],
    signature: "— Suho",
    finaleNote: "«Men birinchi bo'lganimni unutmang.»",
  },
  {
    id: "jukyung",
    name: "Ju-kyung",
    full: "Lim Ju Kyung",
    role: "Makiyaj sehrgari · Doimiy tabassum malikasi",
    hint: "Endi navbat unga — eng quvnoq va mehrli do'stga...",
    image: "images/jukyung.jpg",
    accent: "#ff5d8f",
    accentSoft: "rgba(255,93,143,0.16)",
    lines: [
      "Annyeong, Mushtariy!!!",
      "Bugun yilning eng quvonchli kuni — sizning kuningiz! Tug'ilgan kuningiz bilan!",
      "Xohlasangiz, o'z qo'lim bilan eng chiroyli makiyajni qilib berardim... Lekin ochig'ini aytsam, sizga u umuman kerak emas — tabiiy go'zalligingiz hamma narsadan yorqin!",
      "Menda bir shior bor: qayg'u eshik qaqsa — kulib yuboring! Tabassum — dunyodagi eng arzon va eng kuchli sehr.",
      "Bugun butun dunyo sizga tabassum qilsin! Sizni mahkam-mahkam quchoqlayman!",
    ],
    signature: "— Ju-kyung",
    finaleNote: "«Tabassum qilishni unutmang!»",
  },
  {
    id: "seojun",
    name: "Seo-jun",
    full: "Han So Jun",
    role: "Saebomning «yovvoyi» yigiti · Qo'shiqchal qalb egasi",
    hint: "Dag'al ko'rinadi, lekin so'zlari eng samimiyi...",
    image: "images/seojun.jpg",
    accent: "#d63a54",
    accentSoft: "rgba(214,58,84,0.15)",
    lines: [
      "Hey, Mushtariy.",
      "Men har kimga salomnoma yozib yuradigan odam emasman... Lekin sen — boshqacha. Tug'ilgan kuning muborak.",
      "Bugun motor gurmisi o'rniga faqat sening kulging yangrasin. Xo'sh, bu oramizda qoladigan sir: sen uchun bir qo'shiq belgilab qo'ydim. Qachon eshitgining kelsa — murojaat qil, eshittiraman.",
      "Va yodingda bo'lsin: orzular o'zi kelmaydi — ularga erishiladi. Shu sabab, hech kimga qaramasdan oldinga yur.",
      "Baxtli bo'l. Jiddiy aytayapman.",
    ],
    signature: "— Seo-jun",
    finaleNote: "«Qo'shiq va'dasi — kuchda.»",
  },
  {
    id: "sujin",
    name: "Su-jin",
    full: "Kang Su Jin",
    role: "Nafislik va aql timsoli",
    hint: "Nafislikning o'zi so'zga kelmoqda...",
    image: "images/sujin.jpg",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,0.15)",
    lines: [
      "Mushtariy, tug'ilgan kuning muborak.",
      "Men kuchli va maqsadli ayollarni chuqur hurmat qilaman — va sen aynan shularsan.",
      "Bugun faqat sening kuning: hech kimga hisobot bermasdan, yuraging tilaganini qil. Nafis ko'rin, nafis yasha — buning uchun maxsus kun kerak emas-da, lekin bugunni butunlay o'zingga bag'ishla.",
      "Yillar o'taveradi — muhimi, go'zalliging, aqling va orzularing birga ravnaq topsin.",
      "Eng ezgu tilaklarim bilan.",
    ],
    signature: "— Su-jin",
    finaleNote: "«Har doim o'zing bo'l.»",
  },
  {
    id: "sua",
    name: "Su-a",
    full: "Choi Su A",
    role: "Eng sodiq do'st · Kulgu gurusi",
    hint: "Kulgu gurusi yaqinlashmoqda — tayyor turing!",
    image: "images/sua.jpg",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.16)",
    lines: [
      "MUSHTARIY!!! TUG'ILGAN KUNING BILAN!!!",
      "Bugun ortiqcha gap yo'q — ochiqchasini aytsak: SEN — ENG ZO'R INSONSEN!",
      "Mehribon yuraging va quvnoq kulging seni har joyda yulduz qiladi. Bugun esa butun dunyo sen uchun yaratilgan: shirinliklar, gullar, quyosh — hammasi, hammasi seniki!",
      "Senga eng katta quchoqni yuboryapman — tutib ol!",
      "Do'stligimiz abadiy bo'lsin! SEVAMAN SENI!",
    ],
    signature: "— Su-a",
    finaleNote: "«Quchoq saqlab qo'yilgan!»",
  },
  {
    id: "mohi",
    name: "Mohi",
    full: "Sizning eng aziz dugonangiz",
    role: "Bu guldastaning muallifi · Sizni eng ko'p qadrlaydigan inson",
    hint: "Va eng samimiysi... Uning so'zlari faqat siz uchun.",
    accent: "#ef5d9e",
    accentSoft: "rgba(239,93,158,0.16)",
    lines: [
      "Sevimli dugonam, bugungi quvonchli kuning bilan chin qalbimdan tabriklayman! 💐 Hayotimda sen kabi samimiy, mehribon va ishonchli inson borligidan juda xursandman.",
      "Har doim yuzingdan tabassum, qalbingdan quvonch arimasin. Barcha orzularing amalga oshsin, baxt, sog'lik va omad doimo hamrohing bo'lsin.",
      "Bizning do'stligimiz yillar o'tsa ham o'zgarmasin.",
      "Seni juda qadrlayman, eng yaxshi tilaklarim sen uchun! ❤️",
    ],
    signature: "— dugonang Mohi",
    finaleNote: "«Do'stligimiz abadiy!»",
  },
];

export const NAME_OF_DAY = "Mushtariy";
export const CHANNEL = "@pixelflow_uz";
export const CHANNEL_URL = "https://t.me/pixelflow_uz";

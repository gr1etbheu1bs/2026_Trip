(() => {
  const mapFrame = document.querySelector("[data-google-map]");
  const mapOpenLink = document.querySelector("[data-map-open-link]");
  const mapButtons = [...document.querySelectorAll("[data-map-button]")];

  function updateMap(button) {
    if (!mapFrame || !button) return;
    const url = button.dataset.mapUrl;
    const query = button.dataset.query;
    mapFrame.src = url || `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`;
    if (mapOpenLink) {
      mapOpenLink.href = button.dataset.openUrl || url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      mapOpenLink.textContent = button.dataset.openLabel || "Google Mapsで開く";
    }
  }

  mapButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mapButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updateMap(button);
    });
  });

  const itineraryRoot = document.querySelector("[data-itinerary]");
  const slotButtons = [...document.querySelectorAll(".slot-option[data-slot]:not([data-disabled])")];
  const presetButtons = [...document.querySelectorAll("[data-preset]")];
  const hotelSelects = [...document.querySelectorAll("[data-hotel-night]")];
  const hotelOptionButtons = [...document.querySelectorAll("[data-hotel-option-night]")];
  const privateFields = [...document.querySelectorAll("[data-private-field]")];
  const clearPrivateRouteButton = document.querySelector("[data-clear-private-route]");
  const privateStatus = document.querySelector("[data-private-status]");
  const clearButton = document.querySelector("[data-clear-plan]");
  const selectedMapFrame = document.querySelector("[data-selected-map-frame]");
  const selectedMapPopups = document.querySelector("[data-selected-map-popups]");
  const selectedMapOpen = document.querySelector("[data-selected-map-open]");
  const selectedMapDayButtons = [...document.querySelectorAll("[data-selected-map-day]")];
  const storageKey = "family-trip-g-plan-schedule-v2";
  const privateStorageKey = "family-trip-g-plan-private-route-v1";

  if (!itineraryRoot || !slotButtons.length) return;

  const slotLabels = {
    "d12-am": "午前",
    "d12-pm": "午後",
    "d13-am": "午前",
    "d13-pm": "午後",
    "d14-am": "午前",
    "d14-pm": "午後",
  };

  const dayGroups = [
    { day: "8/12(水)", slots: ["d12-am", "d12-pm"], hotel: "8/12夜" },
    { day: "8/13(木)", slots: ["d13-am", "d13-pm"], hotel: "8/13夜" },
    { day: "8/14(金)", slots: ["d14-am", "d14-pm"] },
  ];

  const places = {
    home: { label: "出発地（都度入力）", maps: "東京南部", lat: 35.600, lng: 139.700 },
    home_return: { label: "帰宅先（都度入力）", maps: "東京南部", lat: 35.600, lng: 139.700 },
    jaxa: { label: "JAXA 宇宙科学探査交流棟", maps: "JAXA 宇宙科学研究所 相模原キャンパス 宇宙科学探査交流棟", lat: 35.558, lng: 139.392 },
    sagamigawa: { label: "相模川ふれあい科学館", maps: "相模川ふれあい科学館 アクアリウムさがみはら", lat: 35.551, lng: 139.332 },
    science_dome: { label: "サイエンスドーム", maps: "コニカミノルタ サイエンスドーム 八王子", lat: 35.664, lng: 139.329 },
    tama_rokuto: { label: "多摩六都科学館", maps: "多摩六都科学館", lat: 35.745, lng: 139.532 },
    tachikawa_bosai: { label: "立川防災館", maps: "立川防災館", lat: 35.704, lng: 139.408 },
    atsugi_science: { label: "厚木市子ども科学館", maps: "神奈川工科大学厚木市子ども科学館", lat: 35.444, lng: 139.363 },
    hotel_routeinn_sagamihara: { label: "ホテルルートイン相模原", maps: "ホテルルートイン相模原 国道129号", lat: 35.552, lng: 139.358 },
    hotel_laxio: { label: "ラクシオ・イン", maps: "ラクシオ・イン 町田", lat: 35.606, lng: 139.367 },
    hotel_hachioji: { label: "八王子駅周辺ホテル", maps: "八王子駅", lat: 35.655, lng: 139.339 },
    hotel_rb_hachioji: { label: "R&Bホテル八王子ワシントン", maps: "R&Bホテル八王子ワシントン", lat: 35.657, lng: 139.344 },
    hotel_super_tachikawa: { label: "スーパーホテル東京・JR立川北口", maps: "スーパーホテル東京 JR立川北口", lat: 35.701, lng: 139.414 },
    hotel_tachikawa_urban: { label: "立川アーバンホテル", maps: "立川アーバンホテル", lat: 35.698, lng: 139.415 },
    hotel_tachikawa_washington: { label: "立川ワシントンホテル", maps: "立川ワシントンホテル", lat: 35.697, lng: 139.413 },
    hotel_routeinn_ebina: { label: "ホテルルートイン海老名駅前", maps: "ホテルルートイン海老名駅前", lat: 35.453, lng: 139.391 },
    hotel_toyoko_fuchinobe: { label: "東横INN横浜線淵野辺駅南口", maps: "東横INN横浜線淵野辺駅南口", lat: 35.568, lng: 139.395 },
    hotel_livemax_minamihashimoto: { label: "ホテルリブマックス南橋本駅前", maps: "ホテルリブマックス南橋本駅前", lat: 35.581, lng: 139.353 },
    hotel_mets_kokubunji: { label: "JR東日本ホテルメッツ国分寺", maps: "JR東日本ホテルメッツ 国分寺", lat: 35.700, lng: 139.481 },
    hotel_mets_musashisakai: { label: "JR東日本ホテルメッツ武蔵境", maps: "JR東日本ホテルメッツ 武蔵境", lat: 35.7019, lng: 139.5451 },
    hotel_kumegawa_wing: { label: "久米川ウイングホテル", maps: "久米川ウイングホテル", lat: 35.750, lng: 139.472 },
    hotel_emisia_tachikawa: { label: "ホテルエミシア東京立川", maps: "ホテルエミシア東京立川", lat: 35.700, lng: 139.414 },
  };

  const itemPlaces = {
    "JAXA相模原キャンパス": "jaxa",
    "相模川ふれあい科学館": "sagamigawa",
    "サイエンスドーム": "science_dome",
    "多摩六都科学館": "tama_rokuto",
    "立川防災館": "tachikawa_bosai",
    "厚木市子ども科学館": "atsugi_science",
    "出発準備・移動": "home",
    "帰宅優先": "home_return",
  };

  const hotelPlaces = {
    "ホテルルートイン相模原": "hotel_routeinn_sagamihara",
    "ラクシオ・イン": "hotel_laxio",
    "八王子駅周辺ホテル": "hotel_hachioji",
    "R&Bホテル八王子ワシントン": "hotel_rb_hachioji",
    "スーパーホテル東京・JR立川北口": "hotel_super_tachikawa",
    "立川アーバンホテル": "hotel_tachikawa_urban",
    "立川ワシントンホテル": "hotel_tachikawa_washington",
    "ホテルルートイン海老名駅前": "hotel_routeinn_ebina",
    "東横INN横浜線淵野辺駅南口": "hotel_toyoko_fuchinobe",
    "ホテルリブマックス南橋本駅前": "hotel_livemax_minamihashimoto",
    "JR東日本ホテルメッツ国分寺": "hotel_mets_kokubunji",
    "JR東日本ホテルメッツ武蔵境": "hotel_mets_musashisakai",
    "久米川ウイングホテル": "hotel_kumegawa_wing",
    "ホテルエミシア東京立川": "hotel_emisia_tachikawa",
  };

  const routeTable = {
    "home|jaxa": { km: 43, min: 75, max: 105, note: "東京南部起点の概算" },
    "home|sagamigawa": { km: 48, min: 85, max: 120, note: "東京南部起点の概算" },
    "home|science_dome": { km: 43, min: 70, max: 100, note: "東京南部起点の概算" },
    "home|tama_rokuto": { km: 38, min: 75, max: 105, note: "東京南部起点の概算" },
    "home|tachikawa_bosai": { km: 35, min: 70, max: 100, note: "東京南部起点の概算" },
    "home|atsugi_science": { km: 43, min: 75, max: 110, note: "東京南部起点の概算" },
    "home|hotel_routeinn_sagamihara": { km: 45, min: 80, max: 110, note: "東京南部起点の概算" },
    "home|hotel_laxio": { km: 43, min: 75, max: 105, note: "東京南部起点の概算" },
    "home|hotel_hachioji": { km: 44, min: 75, max: 105, note: "東京南部起点の概算" },
    "home|hotel_rb_hachioji": { km: 44, min: 75, max: 105, note: "東京南部起点の概算" },
    "home|hotel_super_tachikawa": { km: 36, min: 70, max: 100, note: "東京南部起点の概算" },
    "home|hotel_tachikawa_urban": { km: 36, min: 70, max: 100, note: "東京南部起点の概算" },
    "home|hotel_tachikawa_washington": { km: 36, min: 70, max: 100, note: "東京南部起点の概算" },
    "home|hotel_mets_musashisakai": { km: 31, min: 65, max: 95, note: "東京南部起点の概算" },
    "home|hotel_routeinn_ebina": { km: 45, min: 75, max: 110, note: "東京南部起点の概算" },
    "jaxa|sagamigawa": { km: 6, min: 15, max: 25, note: "相模原南西内の概算" },
    "jaxa|science_dome": { km: 18, min: 45, max: 65, note: "ユーザー地図確認を参考" },
    "jaxa|hotel_routeinn_sagamihara": { km: 5, min: 15, max: 25, note: "ホテル寄せの概算" },
    "jaxa|hotel_laxio": { km: 16, min: 35, max: 55, note: "ホテル寄せの概算" },
    "jaxa|hotel_hachioji": { km: 22, min: 45, max: 65, note: "ホテル寄せの概算" },
    "jaxa|hotel_rb_hachioji": { km: 22, min: 45, max: 65, note: "ホテル寄せの概算" },
    "jaxa|hotel_super_tachikawa": { km: 27, min: 60, max: 85, note: "方面移動の概算" },
    "jaxa|hotel_tachikawa_washington": { km: 27, min: 60, max: 85, note: "方面移動の概算" },
    "jaxa|hotel_mets_musashisakai": { km: 33, min: 75, max: 105, note: "方面移動の概算" },
    "jaxa|tama_rokuto": { km: 33, min: 70, max: 95, note: "方面移動の概算" },
    "jaxa|tachikawa_bosai": { km: 25, min: 55, max: 80, note: "方面移動の概算" },
    "jaxa|atsugi_science": { km: 19, min: 40, max: 65, note: "南寄り移動の概算" },
    "jaxa|hotel_routeinn_ebina": { km: 19, min: 40, max: 65, note: "南寄り移動の概算" },
    "sagamigawa|hotel_routeinn_sagamihara": { km: 6, min: 15, max: 25, note: "ホテル寄せの概算" },
    "sagamigawa|hotel_laxio": { km: 19, min: 40, max: 60, note: "ホテル寄せの概算" },
    "sagamigawa|science_dome": { km: 25, min: 50, max: 70, note: "ユーザー地図確認を参考" },
    "sagamigawa|hotel_hachioji": { km: 26, min: 55, max: 80, note: "ホテル寄せの概算" },
    "sagamigawa|hotel_rb_hachioji": { km: 26, min: 55, max: 80, note: "ホテル寄せの概算" },
    "sagamigawa|tama_rokuto": { km: 42, min: 85, max: 115, note: "方面移動の概算" },
    "sagamigawa|tachikawa_bosai": { km: 36, min: 75, max: 105, note: "方面移動の概算" },
    "sagamigawa|hotel_super_tachikawa": { km: 36, min: 75, max: 105, note: "方面移動の概算" },
    "sagamigawa|hotel_tachikawa_washington": { km: 36, min: 75, max: 105, note: "方面移動の概算" },
    "sagamigawa|hotel_mets_musashisakai": { km: 43, min: 85, max: 120, note: "方面移動の概算" },
    "science_dome|tama_rokuto": { km: 28, min: 75, max: 95, note: "ユーザー地図確認を参考" },
    "science_dome|tachikawa_bosai": { km: 14, min: 35, max: 50, note: "ユーザー地図確認を参考" },
    "science_dome|hotel_routeinn_sagamihara": { km: 17, min: 40, max: 60, note: "ホテル寄せの概算" },
    "science_dome|hotel_laxio": { km: 10, min: 25, max: 40, note: "ホテル寄せの概算" },
    "science_dome|hotel_hachioji": { km: 4, min: 12, max: 20, note: "ホテル寄せの概算" },
    "science_dome|hotel_rb_hachioji": { km: 4, min: 12, max: 20, note: "ホテル寄せの概算" },
    "science_dome|hotel_super_tachikawa": { km: 14, min: 35, max: 50, note: "ホテル寄せの概算" },
    "science_dome|hotel_tachikawa_washington": { km: 14, min: 35, max: 50, note: "ホテル寄せの概算" },
    "science_dome|hotel_mets_musashisakai": { km: 26, min: 65, max: 90, note: "北東寄せの概算" },
    "science_dome|hotel_routeinn_ebina": { km: 33, min: 65, max: 95, note: "南寄り移動の概算" },
    "tama_rokuto|tachikawa_bosai": { km: 14, min: 35, max: 55, note: "ユーザー地図確認を参考" },
    "tama_rokuto|hotel_super_tachikawa": { km: 13, min: 35, max: 55, note: "ホテル寄せの概算" },
    "tama_rokuto|hotel_tachikawa_washington": { km: 13, min: 35, max: 55, note: "ホテル寄せの概算" },
    "tama_rokuto|hotel_mets_musashisakai": { km: 9, min: 25, max: 40, note: "多摩六都午前寄せ候補" },
    "tama_rokuto|hotel_hachioji": { km: 28, min: 60, max: 85, note: "ホテル寄せの概算" },
    "tama_rokuto|hotel_rb_hachioji": { km: 28, min: 60, max: 85, note: "ホテル寄せの概算" },
    "tama_rokuto|hotel_routeinn_sagamihara": { km: 35, min: 75, max: 105, note: "方面移動の概算" },
    "tama_rokuto|hotel_laxio": { km: 33, min: 70, max: 100, note: "方面移動の概算" },
    "tachikawa_bosai|hotel_super_tachikawa": { km: 3, min: 10, max: 18, note: "ホテル寄せの概算" },
    "tachikawa_bosai|hotel_tachikawa_washington": { km: 3, min: 10, max: 18, note: "ホテル寄せの概算" },
    "tachikawa_bosai|hotel_mets_musashisakai": { km: 13, min: 35, max: 55, note: "北東寄せの概算" },
    "tachikawa_bosai|hotel_hachioji": { km: 12, min: 30, max: 45, note: "ホテル寄せの概算" },
    "tachikawa_bosai|hotel_rb_hachioji": { km: 12, min: 30, max: 45, note: "ホテル寄せの概算" },
    "tachikawa_bosai|hotel_laxio": { km: 21, min: 45, max: 70, note: "ホテル寄せの概算" },
    "tachikawa_bosai|hotel_routeinn_sagamihara": { km: 26, min: 60, max: 85, note: "方面移動の概算" },
    "hotel_laxio|hotel_hachioji": { km: 10, min: 25, max: 40, note: "宿間移動の概算" },
    "hotel_laxio|hotel_rb_hachioji": { km: 10, min: 25, max: 40, note: "宿間移動の概算" },
    "hotel_laxio|hotel_routeinn_sagamihara": { km: 13, min: 30, max: 50, note: "宿間移動の概算" },
    "hotel_routeinn_sagamihara|hotel_hachioji": { km: 18, min: 40, max: 60, note: "宿間移動の概算" },
    "hotel_routeinn_sagamihara|hotel_rb_hachioji": { km: 18, min: 40, max: 60, note: "宿間移動の概算" },
    "hotel_routeinn_sagamihara|hotel_routeinn_ebina": { km: 18, min: 40, max: 65, note: "宿間移動の概算" },
    "hotel_mets_kokubunji|hotel_mets_musashisakai": { km: 7, min: 20, max: 35, note: "宿間移動の概算" },
    "atsugi_science|hotel_routeinn_ebina": { km: 4, min: 10, max: 20, note: "南寄り移動の概算" },
    "atsugi_science|hotel_routeinn_sagamihara": { km: 20, min: 45, max: 70, note: "南寄り移動の概算" },
    "atsugi_science|sagamigawa": { km: 16, min: 35, max: 55, note: "南寄り移動の概算" },
    "atsugi_science|science_dome": { km: 35, min: 70, max: 100, note: "方面移動の概算" },
    "atsugi_science|hotel_laxio": { km: 33, min: 65, max: 95, note: "方面移動の概算" },
    "atsugi_science|hotel_hachioji": { km: 37, min: 75, max: 105, note: "方面移動の概算" },
    "atsugi_science|hotel_rb_hachioji": { km: 37, min: 75, max: 105, note: "方面移動の概算" },
  };

  const presetDefinitions = {
    southwest: {
      hotels: { "8/12夜": "ホテルルートイン相模原", "8/13夜": "ホテルルートイン相模原" },
      selections: {
        "d12-am": "出発準備・移動",
        "d12-pm": "JAXA相模原キャンパス",
        "d13-am": "多摩六都科学館",
        "d13-pm": "多摩六都科学館",
        "d14-am": "立川防災館",
        "d14-pm": "帰宅優先",
      },
    },
    northeast: {
      hotels: { "8/12夜": "R&Bホテル八王子ワシントン", "8/13夜": "ホテルルートイン相模原" },
      selections: {
        "d12-am": "多摩六都科学館",
        "d12-pm": "サイエンスドーム",
        "d13-am": "JAXA相模原キャンパス",
        "d13-pm": "ホテル・自由時間",
        "d14-am": "立川防災館",
        "d14-pm": "帰宅優先",
      },
    },
    hachioji: {
      hotels: { "8/12夜": "R&Bホテル八王子ワシントン", "8/13夜": "ラクシオ・イン" },
      selections: {
        "d12-am": "出発準備・移動",
        "d12-pm": "サイエンスドーム",
        "d13-am": "多摩六都科学館",
        "d13-pm": "ホテル・自由時間",
        "d14-am": "JAXA相模原キャンパス",
        "d14-pm": "帰宅優先",
      },
    },
  };

  let state = readState();
  let privateRoute = readPrivateRoute();
  let selectedMapDayIndex = 0;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getPayload(button) {
    return {
      item: button.dataset.item || button.dataset.title,
      title: button.dataset.title,
      detail: button.dataset.detail || "",
      duration: button.dataset.duration || "",
    };
  }

  function buildPreset(name) {
    const definition = presetDefinitions[name] || presetDefinitions.southwest;
    const next = { hotels: clone(definition.hotels), selections: {} };
    Object.entries(definition.selections).forEach(([slot, item]) => {
      const button = slotButtons.find((candidate) => candidate.dataset.slot === slot && candidate.dataset.item === item);
      if (button) next.selections[slot] = getPayload(button);
    });
    return next;
  }

  function readState() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (stored && stored.selections && stored.hotels) return stored;
    } catch {
      return buildPreset("southwest");
    }
    return buildPreset("southwest");
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function readPrivateRoute() {
    try {
      const stored = JSON.parse(localStorage.getItem(privateStorageKey) || "null");
      if (stored && typeof stored === "object") {
        return {
          start: stored.start || "",
          return: stored.return || "",
          hotel12: stored.hotel12 || "",
          hotel13: stored.hotel13 || "",
        };
      }
    } catch {
      return { start: "", return: "", hotel12: "", hotel13: "" };
    }
    return { start: "", return: "", hotel12: "", hotel13: "" };
  }

  function savePrivateRoute() {
    localStorage.setItem(privateStorageKey, JSON.stringify(privateRoute));
  }

  function applyStyles() {
    slotButtons.forEach((button) => {
      const selected = state.selections[button.dataset.slot];
      button.classList.toggle("selected", Boolean(selected && selected.item === button.dataset.item));
    });
  }

  function syncHotelSelects() {
    hotelSelects.forEach((select) => {
      const value = state.hotels[select.dataset.hotelNight];
      if (value) select.value = value;
    });
    hotelOptionButtons.forEach((button) => {
      const selectedHotel = state.hotels[button.dataset.hotelOptionNight];
      button.classList.toggle("selected", selectedHotel === button.dataset.hotelOptionValue);
    });
  }

  function syncPrivateFields() {
    privateFields.forEach((field) => {
      const key = field.dataset.privateField;
      if (document.activeElement !== field) field.value = privateRoute[key] || "";
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function routeKey(origin, destination) {
    return `${origin}|${destination}`;
  }

  function normalizeEstimatePlace(placeId) {
    if (placeId === "home_return") return "home";
    if (placeId === "custom_hotel_8_12") return hotelPlaces[state.hotels["8/12夜"]] || null;
    if (placeId === "custom_hotel_8_13") return hotelPlaces[state.hotels["8/13夜"]] || null;
    return placeId;
  }

  function placeLabel(placeId) {
    if (placeId === "home") return privateRoute.start || places.home.label;
    if (placeId === "home_return") return privateRoute.return || privateRoute.start || places.home_return.label;
    if (placeId === "custom_hotel_8_12") return privateRoute.hotel12 || state.hotels["8/12夜"] || "8/12夜の宿";
    if (placeId === "custom_hotel_8_13") return privateRoute.hotel13 || state.hotels["8/13夜"] || "8/13夜の宿";
    return places[placeId]?.label || "未定";
  }

  function placeMapsValue(placeId) {
    if (placeId === "home") return privateRoute.start || places.home.maps;
    if (placeId === "home_return") return privateRoute.return || privateRoute.start || places.home_return.maps;
    if (placeId === "custom_hotel_8_12") return privateRoute.hotel12 || places[hotelPlaces[state.hotels["8/12夜"]]]?.maps || state.hotels["8/12夜"] || "";
    if (placeId === "custom_hotel_8_13") return privateRoute.hotel13 || places[hotelPlaces[state.hotels["8/13夜"]]]?.maps || state.hotels["8/13夜"] || "";
    return places[placeId]?.maps || places[placeId]?.label || "";
  }

  function toRadians(value) {
    return value * Math.PI / 180;
  }

  function fallbackRoute(origin, destination) {
    const a = places[normalizeEstimatePlace(origin)];
    const b = places[normalizeEstimatePlace(destination)];
    if (!a || !b) return null;
    const earthRadiusKm = 6371;
    const dLat = toRadians(b.lat - a.lat);
    const dLng = toRadians(b.lng - a.lng);
    const lat1 = toRadians(a.lat);
    const lat2 = toRadians(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    const straightKm = 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
    const km = Math.max(2, Math.round(straightKm * 1.45));
    return {
      km,
      min: Math.round(km * 1.8 + 12),
      max: Math.round(km * 2.5 + 20),
      note: "座標からの粗い推定",
    };
  }

  function routeEstimate(origin, destination) {
    if (!origin || !destination || origin === destination) return null;
    const normalizedOrigin = normalizeEstimatePlace(origin);
    const normalizedDestination = normalizeEstimatePlace(destination);
    if (!normalizedOrigin || !normalizedDestination || normalizedOrigin === normalizedDestination) return null;
    return routeTable[routeKey(normalizedOrigin, normalizedDestination)]
      || routeTable[routeKey(normalizedDestination, normalizedOrigin)]
      || fallbackRoute(normalizedOrigin, normalizedDestination);
  }

  function hotelPlace(night) {
    if (night === "8/12夜" && privateRoute.hotel12) return "custom_hotel_8_12";
    if (night === "8/13夜" && privateRoute.hotel13) return "custom_hotel_8_13";
    return hotelPlaces[state.hotels[night]] || null;
  }

  function googleRouteUrl(placeIds) {
    const compactPlaces = placeIds.filter(Boolean).filter((placeId, index, list) => index === 0 || placeId !== list[index - 1]);
    if (compactPlaces.length < 2) return "";
    const names = compactPlaces.map((placeId) => placeMapsValue(placeId)).filter(Boolean);
    if (names.length < 2) return "";
    const params = new URLSearchParams({
      api: "1",
      origin: names[0],
      destination: names[names.length - 1],
      travelmode: "driving",
    });
    const waypoints = names.slice(1, -1).join("|");
    if (waypoints) params.set("waypoints", waypoints);
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function placeCoord(placeId) {
    const place = places[placeId];
    if (!place) return "";
    return `${place.lat},${place.lng}`;
  }

  function placeRouteValue(placeId) {
    if (["home", "home_return", "custom_hotel_8_12", "custom_hotel_8_13"].includes(placeId)) {
      return placeMapsValue(placeId);
    }
    return placeCoord(placeId) || placeMapsValue(placeId);
  }

  function googleEmbedRouteUrl(placeIds) {
    const compactPlaces = placeIds.filter(Boolean).filter((placeId, index, list) => index === 0 || placeId !== list[index - 1]);
    const routeValues = compactPlaces.map((placeId) => placeRouteValue(placeId)).filter(Boolean);
    if (routeValues.length < 2) {
      const query = routeValues[0] || placeMapsValue("home");
      return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=11&output=embed`;
    }
    const origin = routeValues[0];
    const rest = routeValues.slice(1).join(" to:");
    return `https://maps.google.com/maps?f=d&source=s_d&saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(rest)}&hl=ja&output=embed`;
  }

  function addRoutePlace(routePlaces, placeId) {
    if (!placeId) return;
    if (routePlaces[routePlaces.length - 1] !== placeId) routePlaces.push(placeId);
  }

  function startPlaceForDay(index) {
    if (index === 0) return "home";
    const previousNight = dayGroups[index - 1]?.hotel;
    return previousNight ? hotelPlace(previousNight) : null;
  }

  function startMarkerForDay(index, startPlace) {
    if (index === 0) {
      return {
        label: "8/12 出発",
        title: privateRoute.start ? "入力した出発地" : "出発地（未入力）",
        place: placeLabel("home"),
        detail: privateRoute.start ? "この日のGoogle Mapsルートは入力した出発地から開始" : "必要なら上の欄へ出発地を貼り付け",
      };
    }

    const previousNight = dayGroups[index - 1]?.hotel;
    return {
      label: `${dayGroups[index].day} 出発`,
      title: previousNight ? state.hotels[previousNight] || "未定" : "未定",
      place: startPlace ? placeLabel(startPlace) : "未定",
      detail: previousNight ? `${previousNight}の宿から開始` : "前夜の宿が未確認",
    };
  }

  function selectionPlace(selected, group, previousHotel, slot) {
    if (!selected) return null;
    if (selected.item === "ホテル・自由時間") {
      const isMorning = slot?.endsWith("-am");
      if (isMorning) return previousHotel || (group.hotel ? hotelPlace(group.hotel) : null);
      return group.hotel ? hotelPlace(group.hotel) : previousHotel;
    }
    return itemPlaces[selected.item] || null;
  }

  function travelHtml(origin, destination) {
    const route = routeEstimate(origin, destination);
    if (!route) return "";
    return `
      <div class="travel-line">
        <span>車移動目安</span>
        <strong>${escapeHtml(placeLabel(origin))} → ${escapeHtml(placeLabel(destination))}</strong>
        <p>約${route.km}km / 約${route.min}〜${route.max}分 <em>${escapeHtml(route.note)}</em></p>
      </div>
    `;
  }

  function buildDayMapData() {
    let previousHotel = null;
    return dayGroups.map((group, index) => {
      let currentPlace = startPlaceForDay(index);
      const routePlaces = [];
      const markers = [startMarkerForDay(index, currentPlace)];
      addRoutePlace(routePlaces, currentPlace);

      group.slots.forEach((slot) => {
        const selected = state.selections[slot];
        const destination = selectionPlace(selected, group, previousHotel, slot);
        if (destination) {
          currentPlace = destination;
          addRoutePlace(routePlaces, currentPlace);
        }
        markers.push({
          label: `${group.day} ${slotLabels[slot]}`,
          title: selected?.title || "未選択",
          place: destination ? placeLabel(destination) : "未定",
          detail: selected?.duration ? `滞在目安: ${selected.duration}` : "候補表から選択してください",
        });
      });

      if (group.hotel) {
        const destination = hotelPlace(group.hotel);
        if (destination) {
          currentPlace = destination;
          addRoutePlace(routePlaces, currentPlace);
        }
        previousHotel = destination || previousHotel;
        markers.push({
          label: group.hotel,
          title: state.hotels[group.hotel] || "未定",
          place: destination ? placeLabel(destination) : "未定",
          detail: destination?.startsWith("custom_hotel") ? "入力した宿泊先をGoogle Mapsに使用" : "宿泊・回復時間",
        });
      } else {
        addRoutePlace(routePlaces, "home_return");
        markers.push({
          label: "8/14 帰宅",
          title: privateRoute.return || privateRoute.start ? "入力した帰宅先" : "帰宅先（未入力）",
          place: placeLabel("home_return"),
          detail: privateRoute.return || privateRoute.start ? "Google Mapsルートの最終ゴール" : "必要なら上の欄へ帰宅先を貼り付け",
        });
      }

      return {
        day: group.day,
        routePlaces,
        markers,
      };
    });
  }

  function renderSelectedMap() {
    if (!selectedMapFrame || !selectedMapPopups) return;
    const dayMaps = buildDayMapData();
    const active = dayMaps[selectedMapDayIndex] || dayMaps[0];
    selectedMapFrame.src = googleEmbedRouteUrl(active.routePlaces);
    if (selectedMapOpen) {
      selectedMapOpen.href = googleRouteUrl(active.routePlaces) || "https://www.google.com/maps";
      selectedMapOpen.textContent = `${active.day}のGoogle Mapsルートを開く`;
    }
    selectedMapDayButtons.forEach((button, index) => {
      button.classList.toggle("active", index === selectedMapDayIndex);
    });
    selectedMapPopups.innerHTML = active.markers.map((marker) => `
      <article class="selected-map-popup">
        <span>${escapeHtml(marker.label)}</span>
        <strong>${escapeHtml(marker.title)}</strong>
        <p>${escapeHtml(marker.place || "未定")}</p>
        <p>${escapeHtml(marker.detail)}</p>
      </article>
    `).join("");
  }

  function renderTimeline() {
    let previousHotel = null;

    itineraryRoot.innerHTML = dayGroups.map((group, index) => {
      let currentPlace = startPlaceForDay(index);
      const routePlaces = [];
      addRoutePlace(routePlaces, currentPlace);
      let totalKm = 0;
      let totalMin = 0;
      let totalMax = 0;

      const parts = group.slots.map((slot) => {
        const selected = state.selections[slot];
        if (!selected) {
          return `<div class="timeline-item"><span>${slotLabels[slot]}</span><strong>未選択</strong><p>候補表から選択してください。</p></div>`;
        }

        const destination = selectionPlace(selected, group, previousHotel, slot);
        const route = currentPlace && destination && currentPlace !== destination ? routeEstimate(currentPlace, destination) : null;
        const travel = route && currentPlace && destination ? travelHtml(currentPlace, destination) : "";
        if (route) {
          totalKm += route.km;
          totalMin += route.min;
          totalMax += route.max;
          currentPlace = destination;
        } else if (destination) {
          currentPlace = destination;
        }
        addRoutePlace(routePlaces, currentPlace);

        const duration = selected.duration ? ` / ${selected.duration}` : "";
        return `${travel}
          <div class="timeline-item">
            <span>${slotLabels[slot]}${duration}</span>
            <strong>${escapeHtml(selected.title)}</strong>
            <p>${escapeHtml(selected.detail)}</p>
          </div>
        `;
      }).join("");

      let hotel = "";
      if (group.hotel) {
        const destination = hotelPlace(group.hotel);
        const route = currentPlace && destination && currentPlace !== destination ? routeEstimate(currentPlace, destination) : null;
        const travel = route && currentPlace && destination ? travelHtml(currentPlace, destination) : "";
        if (route) {
          totalKm += route.km;
          totalMin += route.min;
          totalMax += route.max;
        }
        previousHotel = destination || previousHotel;
        addRoutePlace(routePlaces, previousHotel);
        const hotelName = destination ? placeLabel(destination) : state.hotels[group.hotel] || "未定";
        const hotelNote = destination?.startsWith("custom_hotel")
          ? "入力した宿泊先をGoogle Mapsルートに使用。候補比較はホテルタブで確認。"
          : "大浴場・朝風呂・移動方向はホテル比較タブで確認。";
        hotel = `${travel}<div class="timeline-item"><span>${group.hotel}</span><strong>${escapeHtml(hotelName)}</strong><p>${escapeHtml(hotelNote)}</p></div>`;
      } else if (currentPlace && currentPlace !== "home_return") {
        const route = routeEstimate(currentPlace, "home_return");
        const travel = route ? travelHtml(currentPlace, "home_return") : "";
        if (route) {
          totalKm += route.km;
          totalMin += route.min;
          totalMax += route.max;
        }
        addRoutePlace(routePlaces, "home_return");
        hotel = `${travel}<div class="timeline-item"><span>8/14夜</span><strong>${escapeHtml(placeLabel("home_return"))}</strong><p>帰宅先はGitHubに保存せず、必要なら上の欄へ貼り付け。</p></div>`;
      }

      const total = totalKm
        ? `<p class="day-total">この日の車移動合計: 約${totalKm}km / 約${totalMin}〜${totalMax}分</p>`
        : `<p class="day-total">この日の車移動合計: なし、または同一地点内</p>`;
      const routeUrl = googleRouteUrl(routePlaces);
      const routeButton = routeUrl
        ? `<div class="route-actions"><a href="${escapeHtml(routeUrl)}" target="_blank" rel="noopener">この日のGoogle Mapsルートを開く</a><p>選択中の候補と宿泊地から作成した検索ルートです。</p></div>`
        : "";

      return `
        <article class="timeline-day">
          <h3>${group.day}<span class="date">${group.slots.map((slot) => slotLabels[slot]).join(" / ")}</span></h3>
          ${total}${parts}${hotel}${routeButton}
        </article>
      `;
    }).join("");
  }

  function refresh() {
    applyStyles();
    syncHotelSelects();
    syncPrivateFields();
    renderTimeline();
    renderSelectedMap();
  }

  slotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.selections[button.dataset.slot] = getPayload(button);
      saveState();
      refresh();
    });
  });

  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state = buildPreset(button.dataset.preset);
      saveState();
      refresh();
    });
  });

  hotelSelects.forEach((select) => {
    select.addEventListener("change", () => {
      state.hotels[select.dataset.hotelNight] = select.value;
      saveState();
      refresh();
    });
  });

  hotelOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.hotels[button.dataset.hotelOptionNight] = button.dataset.hotelOptionValue;
      saveState();
      refresh();
    });
  });

  selectedMapDayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedMapDayIndex = Number(button.dataset.selectedMapDay) || 0;
      renderSelectedMap();
    });
  });

  privateFields.forEach((field) => {
    field.addEventListener("input", () => {
      privateRoute[field.dataset.privateField] = field.value.trim();
      savePrivateRoute();
      if (privateStatus) privateStatus.textContent = "この端末に入力を保存しました。GitHubには送信されません。";
      renderTimeline();
      renderSelectedMap();
    });
  });

  clearPrivateRouteButton?.addEventListener("click", () => {
    privateRoute = { start: "", return: "", hotel12: "", hotel13: "" };
    savePrivateRoute();
    if (privateStatus) privateStatus.textContent = "入力を消しました。";
    refresh();
  });

  clearButton?.addEventListener("click", () => {
    state = buildPreset("southwest");
    saveState();
    refresh();
  });

  refresh();
})();

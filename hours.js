var hours_data = [];
let updating = false;
let total_count = 0;
const scrollContainer = document.querySelector("#chartContainer");

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
    return `${hour.toString().padStart(2, "0")}:${time.slice(3, 5)} ${period}`;
  });
  myChartObj.data.datasets[0].data = Object.values(currentHourData).map(
    (val) => {
      // return Math.floor(Math.random() * 50);
      return Math.floor(Math.random() * 50);
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

//populate select with id #country with all countries
fetch("https://restcountries.com/v3.1/all?fields=name")
  .then((response) => response.json())
  .then((data) => {
    let sort_countries = data.sort((a, b) => {
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
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    document.querySelector("#timezone1").innerText = timeZone;
    document.querySelector("#timezone2").innerText = timeZone;

    const offset = getTimezoneOffset(timeZone);
    document.querySelector("#timezone-3").value = offset * -1;

    total_count = data.total_count;
    document.querySelector("#total_minutes").innerText = total_count;
    document.querySelector("#total_hours").innerText = (
      total_count / 60
    ).toFixed(2);
    document.querySelector("#ticker-top").innerText =
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • ";
    document.querySelector("#ticker-bottom").innerText =
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • " +
      total_count +
      " people signed up  • ";

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

// scrollContainer.addEventListener("wheel", (evt) => {
//   evt.preventDefault();
//   scrollContainer.scrollLeft += evt.deltaY;
// });

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

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
  data: {
    labels: [
      "7:00",
      "7:01",
      "7:02",
      "7:03",
      "7:04",
      "7:05",
      "7:06",
      "7:07",
      "7:08",
      "7:09",
      "7:10",
      "7:11",
      "7:12",
      "7:13",
      "7:14",
      "7:15",
      "7:16",
      "7:17",
      "7:18",
      "7:19",
      "7:20",
      "7:21",
      "7:22",
      "7:23",
      "7:24",
      "7:25",
      "7:26",
      "7:27",
      "7:28",
      "7:29",
      "7:30",
      "7:31",
      "7:32",
      "7:33",
      "7:34",
      "7:35",
      "7:36",
      "7:37",
      "7:38",
      "7:39",
      "7:40",
      "7:41",
      "7:42",
      "7:43",
      "7:44",
      "7:45",
      "7:46",
      "7:47",
      "7:48",
      "7:49",
      "7:50",
      "7:51",
      "7:52",
      "7:53",
      "7:54",
      "7:55",
      "7:56",
      "7:57",
      "7:58",
      "7:59",
    ],
    datasets: [
      {
        label: "",
        data: [
          1, 40, 80, 27, 25, 23, 13, 67, 92, 44, 4, 84, 63, 32, 66, 42, 25, 94,
          62, 62, 32, 9, 13, 61, 34, 4, 51, 26, 38, 97, 2, 97, 83, 92, 98, 26,
          48, 58, 24, 34, 68, 5, 14, 99, 96, 87, 67, 73, 32, 58, 84, 22, 39, 41,
          8, 17, 79, 25, 50, 94,
        ],
        borderWidth: 1,
        barThickness: 2,
        paddding: 0,
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  },
  options: {
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
new Chart(ctx2, {
  type: "bar",
  data,

  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        axis: "y",
        label: "",
        data: [65, 59, 80],
        fill: false,
        backgroundColor: ["#5DCEE8", "#5DCEE8", "#5DCEE8"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    indexAxis: "y",
    tooltips: {
      enabled: false,
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
        stacked: true,
        display: true,
        ticks: {
          mirror: true,
          beginAtZero: true,
          fontColor: "white",
          color: "#000000",
          z: 20,
          font: {
            fontColor: "#fff",
            size: 14,
            padding: "5px",
          },
        },
        scaleLabel: {
          fontColor: "white",
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
      tooltips: {
        enabled: false,
      },
    },
  },
});

// world

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
        (p[3 * g + 0] = _[g].x),
          (p[3 * g + 1] = _[g].y),
          (p[3 * g + 2] = _[g].z);
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
          (s = window.innerHeight),
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
        ((r = new THREE.WebGLRenderer({ alpha: !0, antialias: !0 })).autoClear =
          !1),
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
  },
  data = [
    { lat: 14.632860269079103, long: -90.50595075514552, r: 1 },
    { long: -81.173, lat: 28.4, r: 8 },
    { long: -81.1, lat: 32.084, r: 3 },
    { long: -74.006, lat: 40.713, r: 5 },
    { long: -0.128, lat: 51.507, r: 2 },
    { long: -87.63, lat: 41.878, r: 2 },
    { long: -122.419, lat: 37.775, r: 2 },
    { long: -90.199, lat: 38.627, r: 3 },
    { long: -77.042, lat: -12.046, r: 2 },
    { long: -77.345, lat: 25.06, r: 5 },
    { long: -117.783, lat: 33.542, r: 2 },
    { long: -149.9, lat: 61.218, r: 2 },
    { long: -123.121, lat: 49.283, r: 2 },
    { long: 25.462, lat: 36.393, r: 2 },
    { long: -122.676, lat: 45.523, r: 3 },
    { long: -95.401, lat: 29.817, r: 2 },
  ],
  container = document.getElementById("world"),
  planet = new Earth(container, data);

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

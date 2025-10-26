import type { SakuraConfig } from "../types/config";

// Kelas objek Sakura
class Sakura {
  x: number;
  y: number;
  s: number;
  r: number;
  a: number;
  fn: {
    x: (x: number, y: number) => number;
    y: (x: number, y: number) => number;
    r: (r: number) => number;
    a: (a: number) => number;
  };
  idx: number;
  img: HTMLImageElement;
  limitArray: number[];
  config: SakuraConfig;

  constructor(
    x: number,
    y: number,
    s: number,
    r: number,
    a: number,
    fn: {
      x: (x: number, y: number) => number;
      y: (x: number, y: number) => number;
      r: (r: number) => number;
      a: (a: number) => number;
    },
    idx: number,
    img: HTMLImageElement,
    limitArray: number[],
    config: SakuraConfig
  ) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.a = a;
    this.fn = fn;
    this.idx = idx;
    this.img = img;
    this.limitArray = limitArray;
    this.config = config;
  }

  draw(cxt: CanvasRenderingContext2D) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.globalAlpha = this.a;
    cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s);
    cxt.restore();
  }

  update() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    this.a = this.fn.a(this.a);

    // Jika sakura keluar batas atau sepenuhnya transparan, atur ulang posisi
    if (
      this.x > window.innerWidth ||
      this.x < 0 ||
      this.y > window.innerHeight ||
      this.y < 0 ||
      this.a <= 0
    ) {
      // Jika sakura tidak memiliki batasan
      if (this.limitArray[this.idx] === -1) {
        this.resetPosition();
      }
      // Jika sakura memiliki batasan
      else {
        if (this.limitArray[this.idx] > 0) {
          this.resetPosition();
          this.limitArray[this.idx]--;
        }
      }
    }
  }

  private resetPosition() {
    this.r = getRandom("fnr", this.config);
    if (Math.random() > 0.4) {
      this.x = getRandom("x", this.config);
      this.y = 0;
      this.s = getRandom("s", this.config);
      this.r = getRandom("r", this.config);
      this.a = getRandom("a", this.config);
    } else {
      this.x = window.innerWidth;
      this.y = getRandom("y", this.config);
      this.s = getRandom("s", this.config);
      this.r = getRandom("r", this.config);
      this.a = getRandom("a", this.config);
    }
  }
}

// Kelas daftar Sakura
class SakuraList {
  list: Sakura[];

  constructor() {
    this.list = [];
  }

  push(sakura: Sakura) {
    this.list.push(sakura);
  }

  update() {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].update();
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].draw(cxt);
    }
  }

  get(i: number) {
    return this.list[i];
  }

  size() {
    return this.list.length;
  }
}

// Fungsi untuk mendapatkan nilai acak
function getRandom(option: string, config: SakuraConfig): any {
  let ret: any;
  let random: number;

  switch (option) {
    case "x":
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      ret =
        config.size.min + Math.random() * (config.size.max - config.size.min);
      break;
    case "r":
      ret = Math.random() * 6;
      break;
    case "a":
      ret =
        config.opacity.min +
        Math.random() * (config.opacity.max - config.opacity.min);
      break;
    case "fnx":
      random =
        config.speed.horizontal.min +
        Math.random() * (config.speed.horizontal.max - config.speed.horizontal.min);
      ret = function (x: number, y: number) {
        return x + random;
      };
      break;
    case "fny":
      random =
        config.speed.vertical.min +
        Math.random() * (config.speed.vertical.max - config.speed.vertical.min);
      ret = function (x: number, y: number) {
        return y + random;
      };
      break;
    case "fnr":
      ret = function (r: number) {
        return r + config.speed.rotation;
      };
      break;
    case "fna":
      ret = function (alpha: number) {
        return alpha - config.speed.fadeSpeed * 0.01;
      };
      break;
  }
  return ret;
}

// Kelas manajer Sakura
export class SakuraManager {
  private config: SakuraConfig;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private sakuraList: SakuraList | null = null;
  private animationId: number | null = null;
  private img: HTMLImageElement | null = null;
  private isRunning = false;

  constructor(config: SakuraConfig) {
    this.config = config;
  }

  // Inisialisasi efek sakura
  async init(): Promise<void> {
    if (!this.config.enable || this.isRunning) {
      return;
    }

    // Buat objek gambar
    this.img = new Image();
    this.img.src = "/sakura.png"; // Gunakan gambar sakura

    // Tunggu hingga gambar selesai dimuat
    await new Promise<void>((resolve, reject) => {
      if (this.img) {
        this.img.onload = () => resolve();
        this.img.onerror = () =>
          reject(new Error("Gagal memuat gambar sakura"));
      }
    });

    this.createCanvas();
    this.createSakuraList();
    this.startAnimation();
    this.isRunning = true;
  }

  // Buat kanvas
  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.setAttribute(
      "style",
      `position: fixed; left: 0; top: 0; pointer-events: none; z-index: ${this.config.zIndex};`
    );
    this.canvas.setAttribute("id", "canvas_sakura");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    // Dengarkan perubahan ukuran jendela
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  // Buat daftar sakura
  private createSakuraList(): void {
    if (!this.img || !this.ctx) return;

    this.sakuraList = new SakuraList();
    const limitArray = new Array(this.config.sakuraNum).fill(
      this.config.limitTimes
    );

    for (let i = 0; i < this.config.sakuraNum; i++) {
      const randomX = getRandom("x", this.config);
      const randomY = getRandom("y", this.config);
      const randomS = getRandom("s", this.config);
      const randomR = getRandom("r", this.config);
      const randomA = getRandom("a", this.config);
      const randomFnx = getRandom("fnx", this.config);
      const randomFny = getRandom("fny", this.config);
      const randomFnR = getRandom("fnr", this.config);
      const randomFnA = getRandom("fna", this.config);

      const sakura = new Sakura(
        randomX,
        randomY,
        randomS,
        randomR,
        randomA,
        {
          x: randomFnx,
          y: randomFny,
          r: randomFnR,
          a: randomFnA,
        },
        i,
        this.img,
        limitArray,
        this.config
      );

      sakura.draw(this.ctx);
      this.sakuraList.push(sakura);
    }
  }

  // Mulai animasi
  private startAnimation(): void {
    if (!this.ctx || !this.canvas || !this.sakuraList) return;

    const animate = () => {
      if (!this.ctx || !this.canvas || !this.sakuraList) return;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.sakuraList.update();
      this.sakuraList.draw(this.ctx);
      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  // Tangani perubahan ukuran jendela
  private handleResize(): void {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  // Hentikan efek sakura
  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.canvas) {
      document.body.removeChild(this.canvas);
      this.canvas = null;
    }

    window.removeEventListener("resize", this.handleResize.bind(this));
    this.isRunning = false;
  }

  // Alihkan efek sakura
  toggle(): void {
    if (this.isRunning) {
      this.stop();
    } else {
      this.init();
    }
  }

  // Perbarui konfigurasi
  updateConfig(newConfig: SakuraConfig): void {
    const wasRunning = this.isRunning;
    if (wasRunning) {
      this.stop();
    }
    this.config = newConfig;
    if (wasRunning && newConfig.enable) {
      this.init();
    }
  }

  // Dapatkan status berjalan
  getIsRunning(): boolean {
    return this.isRunning;
  }
}

// Buat instance manajer sakura global
let globalSakuraManager: SakuraManager | null = null;

// Inisialisasi efek sakura
export function initSakura(config: SakuraConfig): void {
  if (globalSakuraManager) {
    globalSakuraManager.updateConfig(config);
  } else {
    globalSakuraManager = new SakuraManager(config);
    if (config.enable) {
      globalSakuraManager.init();
    }
  }
}

// Alihkan efek sakura
export function toggleSakura(): void {
  if (globalSakuraManager) {
    globalSakuraManager.toggle();
  }
}

// Hentikan efek sakura
export function stopSakura(): void {
  if (globalSakuraManager) {
    globalSakuraManager.stop();
    globalSakuraManager = null;
  }
}

// Dapatkan status efek sakura
export function getSakuraStatus(): boolean {
  return globalSakuraManager ? globalSakuraManager.getIsRunning() : false;
}
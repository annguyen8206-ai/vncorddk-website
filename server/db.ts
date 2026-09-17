import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// DB_FILE_PATH lets production point at a persistent path outside the deploy
// directory, so redeploys/rebuilds never wipe admin-edited data.
const DB_PATH = process.env.DB_FILE_PATH
  ? path.resolve(process.env.DB_FILE_PATH)
  : path.resolve(__dirname, '..', 'vncord-data.json');

export interface DbSchema {
  settings: Record<string, string>;
  adminCredentials: Array<{ id: number; username: string; passwordHash: string }>;
  leads: DbLead[];
  articles: Record<string, unknown>[];
  packages: Record<string, unknown>[];
  hospitals: Record<string, unknown>[];
  reviews: Record<string, unknown>[];
}

export interface DbLead {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  gestationalAge: string | null;
  expectedHospital: string | null;
  interestedPackage: string | null;
  note: string | null;
  status: string;
  doctorNotes: string | null;
  createdAt: string;
}

const DEFAULT_DATA: DbSchema = {
  settings: {
    hotlineDisplay: '1900 0909',
    hotlineRaw: '19000909',
    email: 'info@vncorddk.com',
    workingHours: '08:00 – 18:00 | Thứ 2 – Thứ 7',
    address: '51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM',
    facebookUrl: 'https://www.facebook.com/vncord.dk',
    zaloUrl: 'https://zalo.me/0908165222',
  },
  adminCredentials: [],
  leads: [],
  articles: [],
  packages: [],
  hospitals: [],
  reviews: [],
};

let _db: Low<DbSchema> | null = null;

export async function getDb(): Promise<Low<DbSchema>> {
  if (_db) return _db;

  const adapter = new JSONFile<DbSchema>(DB_PATH);
  const db = new Low<DbSchema>(adapter, DEFAULT_DATA);
  await db.read();

  // Ensure all top-level keys exist
  db.data = { ...DEFAULT_DATA, ...db.data };

  await seedDefaults(db);
  await db.write();

  _db = db;
  return db;
}

async function seedDefaults(db: Low<DbSchema>) {
  // Seed admin credentials
  if (!db.data.adminCredentials.find(c => c.username === 'admin')) {
    const hash = bcrypt.hashSync('vncord2025', 10);
    db.data.adminCredentials.push({ id: 1, username: 'admin', passwordHash: hash });
    console.log('[DB] Admin credentials seeded (username: admin, password: vncord2025)');
  }

  // Seed default settings (merge only missing keys)
  for (const [k, v] of Object.entries(DEFAULT_DATA.settings)) {
    if (!db.data.settings[k]) {
      db.data.settings[k] = v;
    }
  }

  // Seed initial leads
  if (db.data.leads.length === 0) {
    const now = new Date().toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
    db.data.leads = [
      { id: 'LEAD-2025-001', fullName: 'Nguyễn Thị Mai Linh', phone: '0912 345 678', email: 'mailinh.nguyen@gmail.com', gestationalAge: 'Tuần thai 32 (Dự sinh: 15/04/2025)', expectedHospital: 'Bệnh viện Từ Dũ', interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)', note: 'Gia đình muốn tìm hiểu gói 25 năm và chính sách trả góp 0%', status: 'consulting', doctorNotes: 'Bác sĩ Lan đã liên hệ, giải thích quy trình tách chiết kép. Hẹn gọi lại vào tối thứ Năm.', createdAt: '09/03/2025 14:32' },
      { id: 'LEAD-2025-002', fullName: 'Trần Thị Thanh Hằng', phone: '0983 221 455', email: 'thanhhang.tran@yahoo.com', gestationalAge: 'Tuần thai 36 (Dự sinh: 20/03/2025)', expectedHospital: 'Bệnh viện Hùng Vương', interestedPackage: 'Máu Cuống Rốn (HSC) - 25 Năm', note: 'Đã hoàn tất thanh toán đợt 1', status: 'contracted', doctorNotes: 'Đã ký Hợp đồng HĐ-2025/082. Bộ kit vô trùng đã gửi trực tiếp tới phòng nhận bệnh viện.', createdAt: '08/03/2025 09:15' },
      { id: 'LEAD-2025-003', fullName: 'Lê Hoàng Yến', phone: '0903 889 123', email: 'yen.lehoang@fpt.com.vn', gestationalAge: 'Đã sinh sáng nay', expectedHospital: 'Bệnh viện Phụ sản MêKông', interestedPackage: 'Mô Cuống Rốn (MSC) - Trọn Đời', note: 'Ca sinh mổ chủ động 08:30', status: 'collected', doctorNotes: 'Kỹ thuật viên VNCORD-DK đã tiếp nhận mẫu tại phòng sinh lúc 09:15. Đang vận chuyển về Lab Quận 7.', createdAt: '07/03/2025 16:45' },
      { id: 'LEAD-2025-004', fullName: 'Phạm Quỳnh Nga', phone: '0977 654 321', email: 'quynhnga.pham@gmail.com', gestationalAge: 'Tuần thai 29 (Dự sinh: 05/05/2025)', expectedHospital: 'Bệnh viện Quốc tế Hạnh Phúc', interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)', note: 'Đăng ký qua website, quan tâm ưu đãi đặt trước tuần 30', status: 'new', doctorNotes: 'Chưa liên hệ. Ưu tiên gọi khung giờ 19:00 - 20:00.', createdAt: now },
      { id: 'LEAD-2025-005', fullName: 'Vũ Minh Trang', phone: '0934 567 890', email: 'trang.vu@vinamilk.com.vn', gestationalAge: 'Tuần thai 34 (Dự sinh: 28/03/2025)', expectedHospital: 'Bệnh viện Đại học Y Dược TP.HCM', interestedPackage: 'Gói Nuôi Cấy Tăng Sinh Tế Bào', note: 'Cần bác sĩ tư vấn chuyên sâu về điều hòa miễn dịch', status: 'consulting', doctorNotes: 'Hẹn gia đình đến thăm quan cơ sở phòng sạch.', createdAt: '06/03/2025 11:10' },
    ];
    console.log('[DB] Initial leads seeded');
  }
}

// Dữ liệu các dự án tĩnh (không dùng API)
const PROJECTS_DATA = [
  {
    title: 'Design Website',
    description: 'Profile giới thiệu trang cá nhân',
    url: 'https://vudinhkhu.io.vn/',
    stars: 86,
    language: 'React',
    topics: [],
    owner: 'ItsMeemo123',
    logo: 'https://sf-static.upanhlaylink.com/img/image_2026031757f25b6ff27c5e8a0b272283e488f7f6.jpg',
    updatedAt: '2026-03-17T00:00:00Z',
    source: 'github',
    tags: ['React']
  },
  {
    title: 'Bio',
    description: 'Bio html đơn giản gọn đẹp',
    url: 'https://itsmeemo123.vercel.app/',
    stars: 234,
    language: 'html',
    topics: [],
    owner: 'ItsMeemo123',
    logo: 'https://sf-static.upanhlaylink.com/img/image_2026031757f25b6ff27c5e8a0b272283e488f7f6.jpg',
    updatedAt: '2024-03-16T00:00:00Z',
    source: 'github',
    tags: ['HTML']
  },
  {
    title: 'estpyro',
    description: 'just a simple placeholder project for portfolio.',
    url: 'https://vudinhkhu.vercel.app/',
    stars: 0,
    language: 'HTML',
    topics: [],
    owner: 'Sqrilizz',
    logo: 'https://sf-static.upanhlaylink.com/img/image_2026031757f25b6ff27c5e8a0b272283e488f7f6.jpg',
    updatedAt: '2024-03-15T00:00:00Z',
    source: 'github',
    tags: ['HTML']
  },
  {
    title: 'SqrilizzLauncher',
    description: 'A powerful launcher application for easy access to your favorite tools.',
    url: 'https://vukhuxxx.github.io/payment/',
    stars: 45,
    language: 'Java',
    topics: ['launcher', 'application'],
    owner: 'Sqrilizz',
    logo: 'https://sf-static.upanhlaylink.com/img/image_2026031757f25b6ff27c5e8a0b272283e488f7f6.jpg',
    updatedAt: '2024-03-14T00:00:00Z',
    source: 'github',
    tags: ['Java', 'launcher']
  } // Thêm dấu phẩy ở đây nếu có thêm phần tử sau
] // Đã thêm dấu phẩy ở phần tử cuối

// Hàm lấy tất cả dự án (trả về dữ liệu tĩnh)
export const fetchAllProjects = async () => {
  // Thêm kiểm tra lỗi
  try {
    return PROJECTS_DATA.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  } catch (error) {
    console.error('Error sorting projects:', error)
    return PROJECTS_DATA // Trả về mảng gốc nếu có lỗi
  }
}

// Hàm format số (giữ lại)
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
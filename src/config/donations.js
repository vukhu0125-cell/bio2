export const savingGoal = {
  title: 'Home',
  description: 'giúp tôi trong lúc khó khăn sẽ có ngày tôi sẽ không giúp lại bạn',
  target: 200,
  currency: 'K'
}

export const topDonators = [
  { 
    name: 'Doggy', 
    amount: 10, 
    currency: 'K', 
    date: '17-03-2026',
    avatar: 'https://media.tenor.com/SgDoRApzncYAAAAe/putting-on-my-sunglasses-ken.png'
  }
]

// Функция для подсчета общей суммы донатов
export const calculateTotalDonations = () => {
  return topDonators.reduce((total, donator) => {
    // Конвертируем все в евро (упрощенно, можно добавить курсы)
    const amount = donator.currency === '$' ? donator.amount * 0.92 : donator.amount
    return total + amount
  }, 0)
}

export const donationMethods = [
  {
    name: 'MB Bank',
    type: 'MB Bank',
    address: 'donate me',
    paypalLink: 'https://sf-static.upanhlaylink.com/img/image_2026031717b5acf57ea031104d9d547a26e25237.jpg',
    hideAddress: true,
    icon: '/mb.png',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    name: 'Buy Me a Coffee',
    type: 'buymeacoffee',
    address: 'ăn xin online',
    buymeacoffeeLink: 'https://sf-static.upanhlaylink.com/img/image_2026031717b5acf57ea031104d9d547a26e25237.jpg',
    hideAddress: true,
    icon: 'https://cdn.simpleicons.org/buymeacoffee/ffffff',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
 {
    name: 'MOMO',
    type: 'trc20',
    address: '0976547487',
   icon: '/mm.png', 
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  }
]
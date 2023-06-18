<template>
  <div class="h-screen">
    <header class="flex justify-center items-center h-16 border-b border-zinc-700 bg-zinc-800 shadow">
      <div class="container h-full flex justify-between items-center">
        <div class="h-full flex items-center gap-8">
          <div class="flex items-center gap-1 px-4 select-none">
            <i class="bx bxs-hot text-2xl text-purple-700"></i>
            <h1 class="text-white">Comet | <strong class="text-purple-600 font-semibold">Finance</strong>
            </h1>
          </div>

          <nav class="flex items-center gap-4 h-full text-white">
            <router-link to="/dashboard" class="flex items-center h-full hover:text-purple-600
            text-zinc-400 text-sm tracking-wide" exact-active-class="text-purple-600 font-medium">
              Dashboard
            </router-link>
            <router-link to="/cards" class="flex items-center h-full hover:text-purple-600
            text-zinc-400 text-sm tracking-wide" exact-active-class="text-purple-600 font-medium">
              Cartões
            </router-link>
            <router-link to="/wallets" class="flex items-center h-full hover:text-purple-600
            text-zinc-400 text-sm tracking-wide" exact-active-class="text-purple-600 font-medium">
              Carteiras
            </router-link>
            <router-link to="/transactions" class="flex items-center h-full hover:text-purple-600
            text-zinc-400 text-sm tracking-wide" exact-active-class="text-purple-600 font-medium">
              Transações
            </router-link>
          </nav>
        </div>
        <div class="flex items-center text-lg text-zinc-300 gap-2">
          <div
            class="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-700 hover:text-white hover:bg-zinc-600 cursor-pointer">
            <i class='bx bx-bell'></i>
          </div>
          <div
            class="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-700 hover:text-white hover:bg-zinc-600 cursor-pointer">
            <i class='bx bx-cog'></i>
          </div>
          <div
            class="w-9 h-9 flex items-center justify-center rounded-full text-red-500 bg-zinc-700 hover:text-red-400 hover:bg-zinc-600 cursor-pointer">
            <i class='bx bx-power-off'></i>
          </div>
        </div>
      </div>
    </header>

    <main class="flex justify-center py-4 bg-zinc-100">
      <section class="container">
        <div class="inline-block border pt-4 bg-white shadow-sm rounded-md overflow-hidden">
          <chart :options="chartOptions"></chart>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Chart } from 'highcharts-vue'

const router = useRouter()
const expensesPerCreditCard = [
  {
    name: 'Nubank',
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
    color: 'rgb(147 51 234)'
  }, {
    name: 'Inter',
    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0],
    color: 'rgb(249 115 22)'
  }, {
    name: 'PicPay',
    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0],
    color: 'rgb(52 211 153)'
  }, {
    name: 'Santander',
    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4],
    color: 'rgb(239 68 68)'
  },
]
const chartOptions = reactive({
  chart: {
    type: 'column',
    width: 600,
    height: 350,
  },
  title: {
    text: 'Gastos semanais',
    align: 'right',
    style: {
      fontSize: '1rem',
    }
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: [
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb',
      'Dom',
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    },
    labels: {
      style: {
        fontSize: '0.75rem'
      },
      formatter: function () {
        return this.value ? `R$ ${this.value.toFixed(2)}`.replace('.', ',') : '' // Adiciona o prefixo "R$" e formata para duas casas decimais
      }
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: `
      <tr>
        <td style="color:{series.color};padding:0;">{series.name}: </td>
        <td style="padding:0 0 0 1rem;">
          <b>R$ {point.y:.2f}</b>
        </td>
      </tr>`,
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      borderWidth: 0
    }
  },
  series: [
    ...expensesPerCreditCard,
    {
      type: 'spline',
      name: 'Media/dia',
      data: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).media,
      color: 'rgb(245 158 11)',
      showInLegend: false
    },
    {
      type: 'pie',
      name: 'Total',
      data: [
        {
          name: 'Total gasto',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).totalCalculated,
          color: 'rgb(39 39 42)',
          dataLabels: {
            enabled: true,
            distance: -50,
            formatter: function () {
              return `R$ ${this.y.toFixed(2)}`.replace('.', ',');
            },
            style: {
              fontSize: '12px',
              color: 'rgb(39 39 42)',
              textOutline: 'none'
            }
          }
        },
        {
          name: 'Segunda-feira',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[0],
          color: 'rgb(239 68 68)'
        },
        {
          name: 'Terça-feira',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[1],
          color: 'rgb(249 115 22)'
        },
        {
          name: 'Quarta-feira',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[2],
          color: 'rgb(234 179 8)'
        },
        {
          name: 'Quinta-feira',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[3],
          color: 'rgb(34 197 94)'
        },
        {
          name: 'Sexta-feira',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[4],
          color: 'rgb(59 130 246)'
        },
        {
          name: 'Sábado',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[5],
          color: 'rgb(99 102 241)'
        },
        {
          name: 'Domingo',
          y: calculateTotalAndMediaSpendOnDay(expensesPerCreditCard).total[6],
          color: 'rgb(139 92 246)'
        }
      ],
      center: [35, 35],
      size: 100,
      innerSize: '70%',
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }]
})

onMounted(() => {
  currentRoute()
})

function calculateTotalAndMediaSpendOnDay(expenses) {
  const mappedDataValues = expenses.map(expense => expense.data)
  const addedValues = Array(mappedDataValues[0].length).fill(0)

  for (let i = 0; i < mappedDataValues.length; i++) {
    for (let j = 0; j < mappedDataValues[i].length; j++) {
      addedValues[j] += mappedDataValues[i][j]
    }
  }

  const total = addedValues.map(sum => sum)
  const totalCalculated = addedValues.reduce((current, next) => current + next)
  const media = addedValues.map(sum => sum / mappedDataValues.length)
  return {
    total,
    totalCalculated,
    media
  }
}

const currentRoute = (currentRoute) => {
  return router.options.history.state.current === currentRoute
}
</script>
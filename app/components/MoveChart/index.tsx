'use client'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { MovesChartProps } from '../../types/pokemonType'

const MovesChart = ({ moves }: MovesChartProps) => {
  const chartData = moves
    ?.map(moveEntry => {
      const levelLearned = moveEntry?.version_group_details?.map(
        vgd => vgd?.level_learned_at,
      )
      const level = Math.min(...(levelLearned ?? [0])) // Default to 0 if levelLearned is undefined
      const name = moveEntry?.move?.name
      return { level, name }
    })
    .filter(move => move.level > 0)

  chartData?.sort((a, b) => a.level - b.level)

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData?.map(move => move.name),
    },
    title: {
      text: 'Pokémon Moves by Level Learned',
    },
  }

  const series: ApexAxisChartSeries = [
    {
      name: 'Level Learned',
      data: chartData?.map(move => move.level) ?? [], // Default to an empty array if chartData is undefined
    },
  ]

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  )
}

export default MovesChart

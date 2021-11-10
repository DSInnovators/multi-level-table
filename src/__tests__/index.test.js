import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MultiLevelTable from '../index'

const data = [
  {
    id: 1,
    institution_name: 'Birshreshtha Noor Mohammad Public College',
    institution_name_bn: 'বীরশ্রেষ্ঠ নূর মোহাম্মদ পাবলিক কলেজ'
  },
  {
    id: 2,
    institution_name: 'Govt. Mohammadpur Model School & College',
    institution_name_bn: 'সরকারি মোহাম্মদপুর মডেল স্কুল অ্যান্ড কলেজ'
  },
  {
    id: 3,
    institution_name: 'Viqarunnisa Noon School & College',
    institution_name_bn: 'ভিকারুননিসা নূন স্কুল এন্ড কলেজ'
  }
]

const structure = {
  name: 'institutions',
  children: [
    { field: 'institution_name', display: 'Name' },
    { field: 'institution_name_bn', display: 'Name (BN)' }
  ]
}

test('loads and displays greeting', () => {
  render(<MultiLevelTable data={data} structure={structure} />)

  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
  expect(
    screen.getByRole('columnheader', { name: 'Name (BN)' })
  ).toBeInTheDocument()
})

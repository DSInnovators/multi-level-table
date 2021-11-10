import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MultiLevelTable from '../index'

const data = [
  {
    id: 1,
    name: "Lorem University ",
    degrees: [
      {
        id: 1,
        name: "B.Sc ",
        courses: [
          {
            id: 1,
            name: "Computer Science and Engineering ",
          },
          {
            id: 2,
            name: "Electrical and Electronics Engineering",
          },
          {
            id: 3,
            name: "Busniess Administration",
          },
        ],
      },
      {
        id: 2,
        name: "M.Sc",
        courses: [
          {
            id: 1,
            name: "Computer Science and Engineering",
          },
          {
            id: 2,
            name: "Electrical and Electronics Engineering",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ipsum University",
    degrees: [
      {
        id: 1,
        name: "B.Sc",
        courses: [
          {
            id: 1,
            name: "Computer Science and Engineering",
          },
          {
            id: 2,
            name: "Busniess Administration",
          },
        ],
      },
      {
        id: 2,
        name: "M.Sc",
        courses: [
          {
            id: 1,
            name: "Computer Science and Engineering",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Test University"
  }
];

const structure = {
    name: "institutions",
    children: [{
      field: "name",
      display: "Institute"
    }],
    array: {
      name: "degrees",
      children: [{
        field: "name",
        display: "Degree"
      }],
      array: {
        name: "courses",
        children: [{
          field: "name",
          display: "Course"
        }],
      },
    },
  };

const actions = [
    {
      name: "View Course Details",
      callback: (value) => {
        console.log("Course Details :", value);
      },
    },
    {
      name: "Students",
      callback: (value) => {
        console.log("Students:", value);
      },
    },
  ]


const actionLabel = 'Manage '

test('header name testing ', () => {
  render(
    <MultiLevelTable
      data={data}
      structure={structure}
      actions={actions}
      actionLabel={actionLabel}
    />
  )

  expect(screen.getByRole('columnheader', { name: 'Institute' })).toBeInTheDocument()
  expect(
    screen.getByRole('columnheader', { name: 'Course' })
  ).toBeInTheDocument()
})

test('header testing ', () => {
  render(
    <MultiLevelTable
      data={data}
      structure={structure}
      actions={actions}
      actionLabel={actionLabel}
    />
  )

  const input = screen.getByRole('row', { name: /Institute/i })
  expect(input.textContent).toContain('Degree')
  expect(input.textContent).toContain('Course')
  expect(input.textContent).toContain('Manage')
})

test('checking valid row values', () => {
  render(
    <MultiLevelTable
      data={data}
      structure={structure}
      actions={actions}
      actionLabel={actionLabel}
    />
  )

  const row = screen.getByRole('row', { name: /Lorem University/i })
  expect(row.textContent).toContain('B.Sc Computer Science and Engineering')
  expect(row.textContent).toContain('Manage ↓')
})


test('checking rowspan of institute names', () => {
  render(
    <MultiLevelTable
      data={data}
      structure={structure}
      actions={actions}
      actionLabel={actionLabel}
    />
  )

  const cell = screen.getByRole('cell', { name: /Lorem University/i })
  expect(cell.rowSpan).toBe(5)
})






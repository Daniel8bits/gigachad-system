import React from 'react'
import ContentLayout from "@layouts/contentLayout/ContentLayout"
import SquareButton from '@components/squareButton/SquareButton'
import Roles from '@utils/enums/Roles'

interface EmployeesHomeConfig<T extends string> {
  buttons: {
    to: T, 
    label: string
  }[]
}

function EmployeesHomeTemplate<T extends string>(config: EmployeesHomeConfig<T>) {

  const Template: React.FC<JSX.IntrinsicAttributes> = () => {
    return (
      <ContentLayout>
        {config.buttons.map(button => 
          <SquareButton 
            key={button.to} 
            to={button.to}
            label={button.label}
          />)}
      </ContentLayout>
    )
  }

  return Template

}

export default EmployeesHomeTemplate
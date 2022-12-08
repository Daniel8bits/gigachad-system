import React, { useMemo } from 'react';

interface TutorialExplainingProps {
  explanation: string
}

const TutorialExplaining: React.FC<TutorialExplainingProps> = (props) => {

  const paragraphs = useMemo(() => {
    return props.explanation.split('\n')
  }, [props.explanation])

  return (
    <div className='tutorial-explaining'>
      <h2> Explicação </h2>
      {paragraphs.map((text, key) => <p> {text} </p>)}
    </div>
  );
};

export default TutorialExplaining;
import queryToString from "@utils/algorithms/queryToString"
import { useNavigate } from "react-router-dom"

function useNavigateWithParams() {
  const navigate = useNavigate()
  return (to: string, query: SerializableMap<string, string>) => {
    const queryString = queryToString(query)
    navigate(`${to}${queryString}`)
  }
}

export default useNavigateWithParams
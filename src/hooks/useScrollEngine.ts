import { useEffect } from 'react'
import { initScroll } from '../lib/scroll'
export function useScrollEngine() { useEffect(() => initScroll(), []) }

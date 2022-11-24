import React, {useMemo} from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from './store'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { profileActions } from './profile'
import { navigationActions } from './navState'
import { infoUserActions } from './infoUser'

export const actions = {
  ...profileActions,
  ...navigationActions,
  ...infoUserActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

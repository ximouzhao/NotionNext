import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import { useGlobal } from '@/lib/global'
let lock = false

const SearchInput = props => {
  const { currentSearch, cRef, className } = props
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { locale } = useGlobal()
  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(r => {
        setLoadingState(false)
      })
      // location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' }).then(r => {})
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      // 回车
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) {
      // ESC
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = val => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val

    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }
  function lockSearchInput () {
    lock = true
  }

  function unLockSearchInput () {
    lock = false
  }

  return (
    <div
      className={
        'flex w-full items-center rounded-lg border border-gray-300 bg-white shadow-sm transition focus-within:border-gray-500 focus-within:shadow-md dark:border-gray-500 dark:bg-gray-700 ' +
        className
      }
    >
      <input
        ref={searchInputRef}
        type="text"
        className={
          'w-full rounded-lg bg-transparent py-2 pl-5 pr-10 text-sm font-light leading-10 text-black outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-300'
        }
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        placeholder={locale.SEARCH.ARTICLES}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={currentSearch || ''}
      />

      <div
        className="-ml-8 cursor-pointer items-center justify-center py-2"
        onClick={handleSearch}
      >
        <i
          className={`transform cursor-pointer fas duration-200 hover:text-black dark:hover:text-white ${
            onLoading
              ? 'fa-spinner animate-spin text-gray-500'
              : 'fa-search text-gray-600 dark:text-gray-200'
          }`}
        />
      </div>

      {showClean && (
        <div className="-ml-12 cursor-pointer items-center justify-center py-2">
          <i
            className="fas fa-times cursor-pointer text-gray-500 transform duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white"
            onClick={cleanSearch}
          />
        </div>
      )}
    </div>
  )
}

export default SearchInput

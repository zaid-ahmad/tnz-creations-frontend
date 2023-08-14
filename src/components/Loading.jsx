function Loading() {
  return (
    <>
      <div
        role='status'
        className='fixed inset-0 flex items-center justify-center z-50 bg-white'
      >
        <div className='flex'>
          <div className='relative'>
            <div
              className='w-12 h-12 rounded-full absolute
                            border-8 border-solid border-gray-200'
            ></div>

            <div
              className='w-12 h-12 rounded-full animate-spin absolute
                            border-8 border-solid border-primary border-t-transparent'
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading

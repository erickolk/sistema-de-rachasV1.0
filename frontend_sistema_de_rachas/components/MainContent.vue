<template>
    <div class="h-full w-full flex flex-col bg-gray-900">
      <slot class="flex-1" name="header" />
      <div class="bg-gray-100 w-full h-max flex-1">
        <div class="w-full h-full p-5 mx-auto max-w-screen-xl">
          <slot name="content" />
        </div>
      </div>
    </div>
  </template>
  
  
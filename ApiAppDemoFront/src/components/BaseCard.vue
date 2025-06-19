<template>
  <div class="container h-100 pb-5">
    <div class="row d-flex align-items-center h-100">
      <div class="col-12 col-md-12 col-lg-12 col-xl-12">
        <div class="card bg-white text-dark" style="border-radius: 1rem;">
          <div class="card-body p-2 text-center">
            <div class="mb-md-4 mt-md-4 pb-2">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: "home" });
definePage({
  name: "home",
  meta: {
    role: ["user"],
    requiresAuth: true,
    title: "主页",
    icon: "mi:home",
    sort: 1,
  },
});
</script>

<template>
  <div class="home">
    <Statistic />
    <BarChart class="card-70" />
    <n-card
      class="card-30"
      title="访问IP分布">
      <PieChart2 />
    </n-card>
    <n-card class="card-40">
      <LineChart />
    </n-card>
    <n-card
      class="card-30"
      title="活跃用户">
      <ActiveUser />
    </n-card>
    <n-card
      class="card-30"
      title="时间线">
      <TimeLine />
    </n-card>
  </div>
</template>
<style>
.home {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 1%;
}
.home > * {
  box-sizing: border-box;
}
.home .statistic {
  flex-basis: 100%;
}
.home .card-70 {
  flex-basis: 70%;
}
.home .card-30 {
  flex-grow: 1;
  flex-basis: 26%;
}
.home .card-40 {
  flex-basis: 40%;
}
@media only screen and (max-width: 1200px) {
  .home .card-70 {
    flex-basis: 100%;
  }
  .home .card-30 {
    flex-basis: 38%;
  }
  .home .card-40 {
    flex-basis: 60%;
  }
}

@media only screen and (max-width: 900px) {
  .home .card-40 {
    flex-basis: 100%;
  }
  .home .card-30 {
    flex-basis: 100%;
  }
}
</style>

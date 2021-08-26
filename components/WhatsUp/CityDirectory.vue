<template>
  <v-list two-line>
    <v-list-item-group active-class="primary--text">
      <template v-for="(organization, index) in directory">
        <v-list-item
          :key="organization.id"
          :to="{
            name: 'organizations-id',
            params: { id: organization.id },
          }"
        >
          <template>
            <v-list-item-avatar size="100" tile>
              <v-img
                v-if="organization.organization_image"
                :src="organization.organization_image"
                contain
              />
              <v-img
                v-else
                :src="require('~/assets/logo-icon.png')"
                height="80"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-text="organization.name"
              />

              <div
                class="mt-2 font-weight-light"
                v-html="organization.description"
              />
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-divider v-if="index < directory.length - 1" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    directory: Array,
  },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>

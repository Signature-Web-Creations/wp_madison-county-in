<template>
	<div class="block-space">
		<div class="container">
			<div class="block-head text-center mb-5">
				<h2 class="head-line display-3">
					{{title}}

				</h2>
				<p class="lead mt-2 head-desc text-primary">{{desc}}</p>
			</div>
		</div>
		<!-- Categories Carousel -->
        {{categories}}
        <v-carousel v-model="model">
    <v-carousel-item
      v-for="data in categories"
      :key="data"
    >
      <v-sheet
        :color="data.color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ data.name }}
            <v-img :src="data.image" width="60" />
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
	</div>
</template>

<script>
// import Slick from "vue-slick";
import {mapState} from 'vuex'

export default {
	props: ['title', 'desc', 'type'],
    data(){return {categories:[]}},
    computed:mapState("wuapi", ["event_categories","organization_categories"]),
    created(){
        if (this.type === "events"){ this.categories = this.event_categories;}
        else
        { this.categories = this.organization_categories;}
    }
};
</script>

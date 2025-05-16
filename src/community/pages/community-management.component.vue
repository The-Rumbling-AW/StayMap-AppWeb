<script>
import { Community } from "@/community/model/community.entity.js";
import CommunityItemCreateAndEditComponent from "@/community/components/community-item-create-and-edit.component.vue";
import DataManager from "@/shared/components/data-manager.component.vue";
import { CommunityService } from "@/community/services/community.service.js";

export default {
  name: "community-management",
  components: { CommunityItemCreateAndEditComponent, DataManager },
  data() {
    return {
      title: { singular: "Community", plural: "Communities" },
      communities: [],
      community: new Community({}),
      selectedCommunities: [],
      communityService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "success", summary: "Success", detail: message, life: 3000 });
    },

    findIndexById(id) {
      return this.communities.findIndex((community) => community.id === id);
    },

    onNewItem() {
      alert("⚠ No se puede crear una comunidad en modo lectura (estático).");
    },

    onEditItem(item) {
      alert("⚠ No se puede editar una comunidad en modo lectura (estático).");
    },

    onDeleteItem(item) {
      alert("⚠ No se puede eliminar una comunidad en modo lectura (estático).");
    },

    onDeleteSelectedItems() {
      alert("⚠ No se pueden eliminar comunidades en modo lectura (estático).");
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested() {
      alert("⚠ Guardar no está disponible en modo lectura.");
    },
  },

  created() {
    this.communityService = new CommunityService();
    this.communityService
      .getAll()
      .then((communities) => {
        console.log("✅ Comunidades cargadas:", communities);
        this.communities = communities;
      })
      .catch((error) => console.error("❌ Error al cargar comunidades", error));
  },
};
</script>

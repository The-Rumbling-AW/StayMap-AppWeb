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
      this.community = new Community({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.community = new Community(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    // ⚠ Métodos deshabilitados en modo estático
    createCommunity() {
      alert("⚠ Crear comunidades no está disponible en modo lectura.");
    },
    updateCommunity() {
      alert("⚠ Editar comunidades no está disponible en modo lectura.");
    },
    deleteCommunity() {
      alert("⚠ Eliminar comunidades no está disponible en modo lectura.");
    },
    deleteSelectedCommunities() {
      alert("⚠ Eliminar comunidades no está disponible en modo lectura.");
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      this.submitted = true;
      if (this.community.name?.trim()) {
        if (item.id) {
          this.updateCommunity();
        } else {
          this.createCommunity();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
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

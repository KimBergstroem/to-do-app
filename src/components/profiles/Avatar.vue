<script setup>
import { ref, toRefs, watch } from "vue";
import { supabase } from "../../supabase/supabase";

const props = defineProps(["path", "size"]);
const { path, size } = toRefs(props);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");

const defaultAvatarUrl =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const uploadAvatar = async (evt) => {
  const files = evt.target.files;
  try {
    uploading.value = true;
    if (!files || files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

watch(path, () => {
  if (path.value) downloadImage();
});
</script>

<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }" />
    <img
      v-else
      :src="defaultAvatarUrl"
      alt="Default Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }" />

    <div :style="{ width: size + 'em' }">
      <label
        class="button primary text-white block btn btn-clr-primary mt-3 mb-3"
        for="single">
        {{ uploading ? "Uploading ..." : "Upload" }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading" />
    </div>
  </div>
</template>

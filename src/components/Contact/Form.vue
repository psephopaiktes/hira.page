<template>
  <form @submit.prevent="send()">
    <label>
      <span>返信用メールアドレス</span>
      <input
        type="email"
        name="email"
        v-model="email"
        placeholder="hoge@mail.com"
        @input="validate()"
        required
      />
    </label>

    <label>
      <span>お問い合わせ内容</span>
      <textarea
        class="textarea"
        contenteditable="true"
        v-model="message"
        @input="validate()"
        placeholder="お問い合わせ内容"
        rows="6"
      ></textarea>
    </label>

    <button type="submit" :disabled="status == ''" :class="status">
      <img
        v-if="status == 'sending'"
        src="@/assets/loader.svg"
        alt="sending..."
      />
      <span v-else-if="status == 'success'">送信しました 🙆‍♀️</span>
      <span v-else-if="status == 'error'">エラーが発生しました</span>
      <span v-else>送信</span>
    </button>

    <p class="errorText" v-if="errorText != ''">※ {{ errorText }}</p>
  </form>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      status: "",
      email: "",
      message: "",
      errorText: ""
    };
  },
  methods: {
    validate() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

      if (!reg.test(this.email)) {
        this.errorText = "メールアドレスが正しくありません";
        this.status = "";
        return;
      } else if (0 < this.message.length && this.message.length < 10) {
        this.errorText = "お問い合わせ内容は10文字以上入力してください";
        this.status = "";
        return;
      } else if (400 < this.message.length) {
        this.errorText = "お問い合わせ内容は400文字以内にしてください";
        this.status = "";
        return;
      } else {
        this.errorText = "";
      }

      if (this.email != "" && this.message != "") {
        this.status = "ready";
      }
    },
    send() {
      this.status = "sending";
      fetch(
        `https://formcarry.com/s/${process.env.VUE_APP_FORMCARRY_ENDPOINT}`,
        {
          recapture: false,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ email: this.email, message: this.message })
        }
      )
        .then(response => response.json())
        .then(response => {
          if (response.code === 200) {
            this.status = "success";
          } else {
            // Formcarry error
            this.status = "error";
          }
        })
        // network error
        .catch(() => (this.status = "error"));
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/style/common.scss" as *;

form {
  margin-top: 4.8rem;
  max-width: 40em;
  text-align: left;
  label {
    display: block;
    margin-top: 1.6rem;
    span {
      margin-left: 0.4rem;
      letter-spacing: 0;
      font-weight: 500;
      &::after {
        content: "必須";
        font-size: 11px;
        color: color(base);
        margin-left: 0.5em;
        padding: 0 0.5em;
        line-height: 1.5;
        font-weight: 500;
        border-radius: 3px;
        background: color(theme);
      }
    }
  }
  input,
  textarea {
    display: block;
    margin-top: 0.4rem;
    padding: 1.6rem;
    width: 100%;
    border: 0.3rem solid transparent;
    border-radius: 0.8rem;
    background: color(main, 0.1);
    color: color(main);
    outline: none;
    caret-color: color(main);
    font-size: 1.8rem;
    cursor: text;
    appearance: none;
  }
  textarea {
    resize: vertical;
  }
  input::placeholder,
  textarea::placeholder {
    color: color(main, 0.3);
  }
  input:focus,
  textarea:focus {
    border-color: color(main, 0.2);
  }
  button {
    display: block;
    width: 32rem;
    height: 5.6rem;
    max-width: 100%;
    margin-top: 3.2rem;
    border-radius: 0.6rem;
    background: color(main);
    color: color(base);
    letter-spacing: 0.05em;
    font-weight: 700;
    font-size: 1.2em;
    border: 0.3rem solid transparent;
    pointer-events: none;
    cursor: not-allowed;
    transition: $TRANSITION;
    will-change: transform;
    img {
      width: 4.8rem;
      height: 4.8rem;
      opacity: 0.8;
      @media (prefers-color-scheme: dark) {
        filter: brightness(0.5);
      }
    }
    &.ready {
      pointer-events: auto;
      cursor: pointer;
    }
    &.success {
      background: color(theme);
    }
    &.error {
      background: color(error);
    }
    &:hover,
    &:active {
      transform: scale(1.04);
    }
    &:focus {
      border-color: color(base, 0.5);
    }
    &:disabled {
      opacity: 0.5;
      color: color(base, 0.5);
    }
  }
  .errorText {
    margin-top: 1.2rem;
    margin-left: 0.5em;
    color: color(error);
  }
}
</style>

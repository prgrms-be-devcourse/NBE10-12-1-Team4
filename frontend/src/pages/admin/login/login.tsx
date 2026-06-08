import { Icons } from "../components/icons";
import { Button, Field } from "../components/ui";
import { TextField } from '@radix-ui/themes';

const Login = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.05fr .95fr",
      }}
    >
      {/* Left — brand panel */}
      <div
        style={{
          background:
            "linear-gradient(155deg, #57321b 0%, #6b3e22 45%, #3a200f 100%)",
          color: "#fff",
          padding: "56px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            background:
              "repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 14px, transparent 14px 28px)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: 9,
              borderRadius: 12,
              background: "rgba(255,255,255,.14)",
            }}
          >
            <Icons.cup size={22} />
          </div>
          <span
            style={{ fontSize: 17, fontWeight: 680, letterSpacing: "-0.02em" }}
          >
            Grids & Circles
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              opacity: 0.7,
              letterSpacing: ".06em",
              marginBottom: 18,
            }}
          >
            ORDER · MANAGE · SERVE
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 46,
              lineHeight: 1.08,
              fontWeight: 720,
              letterSpacing: "-0.03em",
            }}
          >
            갓 볶은 원두,
            <br />
            집에서 만나보세요
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 16.5,
              lineHeight: 1.6,
              opacity: 0.82,
              maxWidth: 380,
            }}
          >
            로스터는 관리자는 화면에서 주문·재고·매출을 한눈에 관리합니다.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            gap: 28,
            fontSize: 13.5,
            opacity: 0.72,
          }}
        >
          <span>· 당일 로스팅</span>
          <span>· 싱글 오리진 생두</span>
          <span>· 전국 배송</span>
        </div>
      </div>

      {/* Right — form */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <form style={{ width: "100%", maxWidth: 380 }}>
        {/* <form onSubmit={submit} style={{ width: "100%", maxWidth: 380 }}> */}
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            시작하기
          </h2>
          <p
            style={{
              marginTop: 8,
              marginBottom: 28,
              fontSize: 14.5,
              color: "var(--text-2)",
              lineHeight: 1.55,
            }}
          >
            주문 확인 메일을 받을 이메일 주소를 입력해 주세요.
          </p>

          <Field label="이메일"
            children={
              <TextField.Root
              type="email"
              placeholder="you@example.com"
              // value={val}
              autoFocus
              // onChange={(e) => setVal(e.target.value)}
              // onBlur={() => setTouched(true)}
            />
            }
          />
          {/* {touched && !valid && (
            <div style={{ fontSize: 12.5, color: "var(--red)", marginTop: 7 }}>
              올바른 이메일 주소를 입력해 주세요.
            </div>
          )} */}
          <p/>
          <Field label="비밀번호"
            children={
              <TextField.Root
              type="password"
              // value={val}
              autoFocus
              // onChange={(e) => setVal(e.target.value)}
              // onBlur={() => setTouched(true)}
            />
            }
          />

          <Button
            type="submit"
            size="lg"
            iconRight={<Icons.arrowRight size={18} />}
            style={{ width: "100%", marginTop: 22 }}
          >
            관리자 로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

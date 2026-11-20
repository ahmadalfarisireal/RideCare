import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

export function WhatsAppPanel({
  message,
  link,
}: {
  message: string;
  link: string;
}) {
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>Pesan untuk mekanik</CardTitle>
            <p className="mt-1 text-sm text-muted">
              Salin atau bagikan. Pilih kontak bengkelmu sendiri di WhatsApp.
            </p>
          </div>
          <CopyButton text={message} label="Salin pesan ke mekanik" />
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface-2 p-4 font-body text-sm leading-relaxed text-foreground">
            {message}
          </pre>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
          >
            Buka WhatsApp
            <ArrowRightIcon className="size-4" />
          </a>
          <p className="text-xs leading-relaxed text-muted">
            RideCare tidak menampilkan perkiraan harga. Biaya jasa dan sparepart ditanyakan ke
            mekanik sebelum pekerjaan dimulai.
          </p>
        </CardContent>
      </Card>
      <div className="fixed inset-x-0 bottom-16 z-30 flex justify-center px-4 sm:hidden">
        <CopyButton
          text={message}
          label="Salin pesan ke mekanik"
          className="w-full max-w-md shadow-lg"
        />
      </div>
    </>
  );
}

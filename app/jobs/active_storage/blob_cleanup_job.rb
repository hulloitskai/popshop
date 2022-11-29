# typed: strict
# frozen_string_literal: true

module ActiveStorage
  class BlobCleanupJob < ApplicationJob
    extend T::Sig

    # == Configuration
    good_job_control_concurrency_with key: name, total_limit: 1

    sig { void }
    def perform
      ActiveStorage::Blob
        .unattached
        .where("active_storage_blobs.created_at <= ?", 2.days.ago)
        .find_each(&:purge_later)
    end
  end
end
